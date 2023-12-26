import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType, authSchema } from "../../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/auth";
import { useAuth } from "../../hooks/wrQuery";

const Register = () => {
  const { regsiterMutation: { mutate } } = useAuth();
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(authSchema),
  });
  const submit = async (data: RegisterType) => {
    mutate(data, {
      onError: err => {
        console.log(err)
      }
    });
  };

  return (
    <div className="flex items-center px-5 justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-blue-500">Register</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="block text-gray-400 font-medium">Email</label>
            <input
              placeholder="Email"
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              required
            />
            {errors.email && (
              <p className="text-red-500">{errors?.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 font-medium">Password</label>
            <input
              placeholder="Password"
              {...register("password")}
              type="password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 font-medium">Confirm Password</label>
            <input
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              type="password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none"
          >
            Register
          </button>
        </form>
        <h1 className="text-center mt-2 text-gray-400">
          Already have an account?{" "}
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
