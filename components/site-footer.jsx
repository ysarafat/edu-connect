import { cn } from "@/lib/utils";
import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter({ className }) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href="https://nextjs.org/"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next JS
            </Link>
            . Hosted on{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            . Illustrations by{" "}
            <Link
              href="https://popsy.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Popsy
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/ysarafat/edu-connect"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
