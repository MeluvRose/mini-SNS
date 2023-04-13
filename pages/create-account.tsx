import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
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
      setLoading(true);
      const request = await fetch("/api/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.status === 200) {
        alert("Account already exists! Please log in!");
      }
      if (request.status === 201) {
        alert("Account created! Please log in!");
      }
      if (request.status !== 405) {
        router.push("/login");
      }

      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            {...register("name", { required: "Write your name please." })}
          />
          <span>{errors?.name?.message}</span>
        </div>
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
          <span>{errors?.email?.message}</span>
        </div>
        <button>Create Account</button>
      </form>
    </div>
  );
};
