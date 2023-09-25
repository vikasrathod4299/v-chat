import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignIn = () => {
  return (
    <form className="flex flex-col gap-y-4">
      <p className="px-2 tracking-widest font-light text-xl">Log in</p>
      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        placeholder="username"
      />
      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        placeholder="Enter username"
      />
      <Button className="bg-blue-500 rounded-full shadow-md">Sign in</Button>
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
