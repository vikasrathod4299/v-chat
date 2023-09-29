"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import type { RegisterUser } from "@/lib/types";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { signUpApiCall } from "@/lib/apiCalls";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<RegisterUser>({});

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApiCall,
    onSuccess: (data) => {
      alert(`${data.data.first_name} is registerd successfully.`);
    },
    onError: (err: AxiosError) => {
      const responseData = err.response?.data;
      alert(responseData);
    },
  });

  const onSubmit = (data: RegisterUser) => {
    const { confirm_password, ...rest } = data;
    signUp(rest);
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="px-2 tracking-widest font-light text-xl">Register</p>
      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="first name"
        {...register("first_name", {
          required: "Please enter your first name",
        })}
      />
      <span className="text-red-500 text-xs">{errors.first_name?.message}</span>
      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="last name"
        {...register("last_name", { required: "Please enter your last name" })}
      />
      <span className="text-red-500 text-xs">{errors.last_name?.message}</span>

      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Enter username"
        {...register("username", { required: "Please enter username" })}
      />
      <span className="text-red-500 text-xs">{errors.username?.message}</span>

      <Input
        type="email"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Enter your Email"
        {...register("email", { required: "Please enter email" })}
      />
      <span className="text-red-500 text-xs">{errors.email?.message}</span>

      <Input
        type="password"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Password"
        {...register("password", { required: "Please enter password" })}
      />
      <span className="text-red-500 text-xs">{errors.password?.message}</span>

      <Input
        type="password"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Confirm password"
        {...register("confirm_password", {
          validate: (value) => {
            return (
              getValues("password") === value || "Password dose not match."
            );
          },
        })}
      />
      <span className="text-red-500 text-xs">
        {errors.confirm_password?.message}
      </span>

      <Button
        isLoading={isLoading}
        className="bg-blue-500 rounded-full shadow-md"
      >
        Sign up
      </Button>
      <p>
        If you are already registerd, Click{" "}
        <Link href={"sign-in"} className="text-blue-500 underline">
          here
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
