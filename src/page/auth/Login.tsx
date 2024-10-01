import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Define the schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  // react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('data::: ', data);


    navigate("/AgGrid");
  };

  const handleSignupRedirect = () => {
    navigate("/SignUp");
  };

  return (
    <section className="text-gray-400 items-center justify-center body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-5">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?{" "}
            <button
              onClick={handleSignupRedirect}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
