import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, LoginType } from "../../types/auth";
import { useApi } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/wrQuery";
import { AxiosError } from "axios";

const Login = () => {
  const {
    loginMutation: { mutate, isLoading, error: authError, reset: resetError },
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(authSchema),
  });
  const loginUser = async (data: LoginType) => {
    mutate(data, { onSuccess: () => reset() });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-5 text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-blue-500">Login</h2>
        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
          <div>
            <label className="block text-gray-400 font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="email"
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
              {...register("password")}
              type="password"
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {authError && (
            <p onClick={() => resetError()} className="text-red-500">
              {(authError as AxiosError<{ message?: string }>)?.response?.data
                ?.message || (authError as AxiosError)?.message}
            </p>
          )}
          <button
            disabled={isSubmitting || isLoading}
            type="submit"
            className="w-full bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <h1 className="text-center mt-2 text-gray-400">
          Don't have an account?{" "}
          <Link className="text-blue-500" to={"/register"}>
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
