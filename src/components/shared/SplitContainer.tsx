import Link from "next/link";
import { Button } from "../ui/button";
import { RiAiGenerate } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import Image from "next/image";

type SplitContainerProps = {};

export default function SplitContainer({}: SplitContainerProps) {
  return (
    <div className="container grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24">
      <div className="py-6 md:order-1 hidden md:block"></div>
      <div className={"lg:order-last"}>
        <Image
          src="https://img.freepik.com/free-vector/researchers-working-science-lab-together_23-2148486108.jpg"
          alt="Main Image"
          height={0}
          width={0}
          className="h-[400px] w-full"
        />
      </div>
      <div>
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
          Generate labs from video lectures
        </h1>
        <p className="text-lg mt-4 text-gray-800 dark:text-gray-300 max-w-xl">
          Labify is a tool that generates labs from video lectures. It
          automatically detects important information from the video and
          generates a lab for you to practice.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            variant="default"
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/generate">
              <HiOutlineSparkles /> <span>Generate for free</span>
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="flex items-center gap-2"
            asChild
          >
            <Link target="_blank" href="https://github.com/LabifyGe/labify">
              <FaGithub />
              <span>Github Repo</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
