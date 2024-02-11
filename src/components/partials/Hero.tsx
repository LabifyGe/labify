type HeroProps = {};
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { GrGrow } from "react-icons/gr";

import ProcessCard from "../shared/ProcessCard";
import { PiCoins } from "react-icons/pi";
import { FaPhotoVideo } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { LuFileVideo } from "react-icons/lu";

export default function Hero({}: HeroProps) {
  return (
    <section className="container">
      <div className="mt-16 md:mt-0">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Everything you need to practice
        </h2>
        <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
          Labify is a tool that generates labs from video lectures. It
          automatically detects important information from the video and
          generates a lab for you to practice.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-10">
        <ProcessCard
          icon={AiOutlineVideoCameraAdd}
          title="Upload your video"
          description="Upload your video lecture to Labify and let the magic happen."
        />
        <ProcessCard
          icon={RiAiGenerate}
          title="Generate labs"
          description="Labify will automatically detect important information and generate a lab for you to practice."
        />
        <ProcessCard
          icon={GrGrow}
          title="Practice"
          description="Practice the generated labs to improve your skills."
        />
      </ul>
    </section>
  );
}
