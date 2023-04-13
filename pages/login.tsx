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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", { required: "Write your email please." })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            {...register("password", {
              required: "Write your password please.",
            })}
          />
          <span>{errors?.password?.message}</span>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};
