import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onValid = async (data: IForm) => {
    if (!loading) {
      const request = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.status === 200) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  };
  return (
    <div className="bg-violet-900 w-full max-w-xl h-screen flex flex-col items-center justify-center space-y-24">
      <h1 className="text-5xl font-extrabold text-zinc-100">Login</h1>
      <form
        className="w-[400px] max-w-full flex flex-col space-y-8 px-12 py-16 bg-violet-200 rounded-xl "
        onSubmit={handleSubmit(onValid)}
      >
        <div className="flex flex-col space-y-1">
          <div className="flex justify-end items-center">
            <label className="font-semibold mx-auto" htmlFor="email">
              Email
            </label>
            <input
              className="px-2 py-1"
              type="email"
              {...register("email", { required: "Write your email please." })}
            />
          </div>
          <span className="font-semibold text-red-600">
            {errors?.email?.message}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex justify-end items-center">
            <label className="font-semibold mx-auto" htmlFor="password">
              Password
            </label>
            <input
              className="px-2 py-1"
              type="password"
              {...register("password", {
                required: "Write your password please.",
              })}
            />
          </div>
          <span className="font-semibold text-red-600">
            {errors?.password?.message}
          </span>
        </div>
        <button className="px-4 py-3 bg-violet-400 font-semibold hover:bg-violet-600 hover:text-zinc-100">
          Login
        </button>
      </form>
      <svg
        className="w-12 h-12 text-stone-100"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
        ></path>
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
        ></path>
      </svg>
    </div>
  );
};
