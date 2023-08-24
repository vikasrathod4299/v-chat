"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
interface loginInterface {
  username: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInterface>();
  const onSubmit = (data: loginInterface) => {};
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-md shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] w-full p-3 mx-12"
      >
        <h1 className="font-bold tracking-wider">Sign in to your account</h1>
        <Input
          {...register("username", { required: "Please enter username" })}
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}
        <Input
          {...register("password", { required: "Please enter password" })}
          className="mt-4 placeholder:tracking-widest placeholder:font-light"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
        <div className="my-4 text-center">
          <Button className=" w-full shadow-lg rounded-md" variant={"default"}>
            Log In
          </Button>
          <p className="mt-4 text-sm">
            Do not have account?
            <Link className="underline" href={"sign-up"}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
