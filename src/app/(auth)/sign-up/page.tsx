"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

interface registerInterface {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerInterface>();

  const onSubmit = (data: registerInterface) => {};

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-md shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] w-full p-3 mx-12"
      >
        <h1 className="font-bold tracking-wider">Register your account</h1>
        <Input
          {...register("first_name", { required: "First name is required" })}
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your first name"
        />
        {errors.first_name && (
          <span className="text-red-500 text-xs">
            {errors.first_name.message}
          </span>
        )}
        <Input
          {...register("last_name", { required: "Last name is required" })}
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your last name"
        />
        {errors.last_name && (
          <span className="text-red-500 text-xs">
            {errors.last_name.message}
          </span>
        )}

        <Input
          {...register("username", { required: "username is required" })}
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}

        <Input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <Input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your password"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <Input
          {...register("confirm_password", {
            required: "Enter password again",
          })}
          type="password"
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Confirm password"
        />
        {errors.confirm_password && (
          <span className="text-red-500 text-xs">
            {errors.confirm_password.message}
          </span>
        )}

        <div className="my-4 text-center">
          <Button className=" w-full shadow-lg rounded-md" variant={"default"}>
            Log In
          </Button>
          <p className=" mt-4 text-sm">
            Already have an account?
            <Link className="underline" href={"sign-in"}>
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
