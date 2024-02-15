"use server";
import { redirect } from "next/navigation";
// import {GoogleGenerativeAI } from "google-generative-ai";

export default async function uploadVideo(prompt) {

  //
  // console.log("sending to gemini");
  //
  //   const gemini = new GoogleGenerativeAI();
  //   const result = await gemini.createVideoFromText(prompt);
  //   console.log(result);
  //   // redirect to the lab page



  redirect(`/labs/1`);
  return {
    // if error return this otherwise redirect to another page
    message: "Some error message",
  };
}
