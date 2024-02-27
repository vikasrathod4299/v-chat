"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import type { LoginUser } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const SignIn = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();
  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: async (data: LoginUser) => {
      const { data: user } = await axios.post(
        "http://localhost:3001/api/auth/login",
        data
      );
      return user;
    },
    onSuccess: (data) => {
      setUser(data.data);
      router.back();
    },
  });

  if (user) {
    router.back();
    return;
  }
  const onSubmit = (data: LoginUser) => {
    signIn(data);
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="px-2 tracking-widest font-light text-xl">Log in</p>
      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        placeholder="username"
        {...register("username", { required: "Please enter username" })}
      />
      <span className="text-red-500 text-xs">{errors.username?.message}</span>

      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        placeholder="Enter username"
        {...register("password", { required: "Please enter password" })}
      />
      <span className="text-red-500 text-xs">{errors.password?.message}</span>

      <Button
        isLoading={isLoading}
        className="bg-blue-500 rounded-full shadow-md"
      >
        Sign in
      </Button>
      <p>
        Do not have account ? Click{" "}
        <Link href={"sign-up"} className="text-blue-500 underline">
          here
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
