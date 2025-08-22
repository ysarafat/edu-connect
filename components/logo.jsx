import { cn } from "@/lib/utils";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";

export const Logo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
  );
};
