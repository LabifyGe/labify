"use server";
import { redirect } from "next/navigation";

export default async function uploadVideo(prevState: any, formData: FormData) {
  // this is server function u can do that here
  const videoData = formData.get("video");
  // just for example
  await new Promise((resolve: any) => setTimeout(resolve, 3000));

  // redirect
  redirect(`/labs/1`);
  return {
    // if error return this otherwise redirect to another page
    message: "Some error message",
  };
}
