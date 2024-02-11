import { BackgroundAnimation } from "@/components/shared/BackgroundAnimation";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SubmitButton } from "./_components/SubmitButton";
import UploadVideo from "./_components/UploadVideo";

type GeneratePageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function GeneratePage({
  params,
  searchParams,
}: GeneratePageProps) {
  return (
    <div className="min-h-[calc(100vh-380px)]">
      <BackgroundAnimation />
      <UploadVideo />
    </div>
  );
}
