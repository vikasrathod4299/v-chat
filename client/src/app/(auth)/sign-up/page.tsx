import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const SignUp = () => {
  return (
    <form className="flex flex-col gap-y-4">
      <p className="px-2 tracking-widest font-light text-xl">Register</p>

      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Full name"
      />
      <Input
        type="text"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Enter username"
      />
      <Input
        type="email"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Enter your Email"
      />
      <Input
        type="password"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Password"
      />
      <Input
        type="password"
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light "
        placeholder="Confirm password"
      />
      <Button className="bg-blue-500 rounded-full shadow-md">Sign up</Button>
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
