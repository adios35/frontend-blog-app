import { MdWifiProtectedSetup } from "react-icons/md"
import { useAuth } from "../../hooks/wrQuery";
import { Link } from "react-router-dom";
import UseRereshToken from "../../hooks/useRefreshToken";

const NavBar = () => {
  const refresh = UseRereshToken()
  const {
    user,
    logoutMutation: { mutate },
  } = useAuth();

  return (
    <nav className="bg-gray-800 z-10 text-white py-3 px-6 w-full fixed top-0 flex justify-between items-center">
      <h1 className=" font-semibold text-md md:text-xl">{user?.id ? user?.user : <Link to="/">BlogApp</Link>}</h1>
      <button onClick={refresh}>refreshToken</button>
      {user?.user ? (
        <div className="flex justify-center md:gap-3  items-center">
          <button
            onClick={() => mutate()}
            className="bg-blue-500 scale-75 md:scale-100 -mr-4 md:-mr-0 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            Logout
          </button>
          <Link
            to="dashboard"
            className="bg-blue-500 scale-75 md:scale-100 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            dashboard
          </Link>
          <Link
            to="protected"
            className="bg-blue-500 scale-75 md:scale-100 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            <MdWifiProtectedSetup />
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
