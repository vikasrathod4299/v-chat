"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
interface loginInterface {
  username: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInterface>();

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: async (data: loginInterface) => {
      const { data: user } = await axios.post(
        "http://localhost:3001/api/auth/login",
        data
      );
      setUser(user.data);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = (data: loginInterface) => {
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold tracking-wider">Sign in to your account</h1>
      <Input
        {...register("username", { required: "Please enter username" })}
        className="mt-4 placeholder:tracking-widest placeholder:font-light"
        placeholder="Enter your username"
      />
      {errors.username && (
        <span className="text-red-500 text-xs">{errors.username.message}</span>
      )}
      <Input
        {...register("password", { required: "Please enter password" })}
        className="mt-4 placeholder:tracking-widest placeholder:font-light"
        placeholder="Enter your password"
      />
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}
      <div className="my-4 text-center">
        <Button
          isLoading={isLoading}
          className=" w-full shadow-lg rounded-md"
          variant={"default"}
        >
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
  );
};

export default SignIn;
