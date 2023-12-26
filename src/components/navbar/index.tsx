import { useAuth } from "../../hooks/wrQuery";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
// import UseRereshToken from "../../hooks/useRefreshToken";

const credAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

const NavBar = () => {
  const [key, setKey] = useState<number>(0); // State variable to force remounting
  const navigate = useNavigate();
  const [isLogouting, setIsLogouting] = useState(false)

  const {
    user,
    accessToken,
    setUser,
    setAccessToken,
  } = useAuth();

  useEffect(() => {
    // Update the key whenever the accessToken changes
    setKey((prevKey) => prevKey + 1);
  }, [accessToken]);

  async function logout() {
    setIsLogouting(true)
    try {
      await credAxios.delete('/v1/auth/logout', { headers: { "Authorization": `Bearer ${accessToken}` } }).then(() => {
        navigate('login');
        setAccessToken('');
        localStorage.clear()
        setUser((null))
        setIsLogouting(false)

      });
    } catch (error) {
      setIsLogouting(false)
      console.log(error)
    }
  }


  //sometimes using react-query usemutation it didnt set the with credentials to true so the server didnt get the accesstoken
  const { mutate } = useMutation({
    mutationFn: () => credAxios.delete('/v1/auth/logout', { headers: { "Authorization": `Bearer ${accessToken}` } }),
    onSuccess: () => {
      navigate("/")
    }
  })


  return (
    <nav className="bg-gray-800 z-10 text-white py-3 px-6 w-full fixed top-0 flex justify-between items-center">
      <h1 className=" font-semibold text-md md:text-xl">{user?.id ? user?.user : <Link to="/">BlogApp</Link>}</h1>

      {user?.user ? (
        <div className="flex justify-center md:gap-3  items-center">
          <button
            disabled={isLogouting}
            onClick={() => logout()}
            className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allow  scale-75 md:scale-100 -mr-4 md:-mr-0 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            >
            
            Logout
          </button>
          <Link
            to="dashboard"
            className="bg-blue-500 scale-75 md:scale-100 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            dashboard
          </Link>
        </div>
      ) : (
        <>
          <Link
            to="login"
            className="bg-blue-500 scale-75 md:scale-100 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            login
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
