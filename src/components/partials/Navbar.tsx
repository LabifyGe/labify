import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";
import { Button } from "../ui/button";
import { IoIosArrowForward } from "react-icons/io";

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
  return (
    <header>
      <nav className="container py-5 flex justify-between items-center">
        <Link href="/">
          <h2 className="text-lg">
            <span className="font-bold text-primary">Lab</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              ify
            </span>
          </h2>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <Button
            variant="default"
            className="flex items-center gap-1 relative"
            asChild
          >
            <Link href="/generate">
              Try for free <IoIosArrowForward className="relative top-[1px]" />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
