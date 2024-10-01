import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { SignUpFormValues } from "../../interface/interface";
import axios from "axios";
import toast from 'react-hot-toast';


// User SignUp
const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    console.log(data);

    try {
      const res: any = await axios.post('http://localhost:3003/api/signup', data);

      if (res?.data?.st) {
        toast.success(res?.data?.msg);
        navigate("/login");
      } else {
        if (res?.data?.errors?.length > 0) {
          toast.error(res?.data?.errors[0].msg);
        } else {
          toast.error("Something went wrong or Email already exists");
        }
      }
    } catch (error) {
      console.log('error::: ', error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="text-gray-400 items-center justify-center body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${errors.username ? 'border-red-500' : ''}`}
              />
              {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
