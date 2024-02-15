"use server";
import { redirect } from "next/navigation";
import {GoogleGenerativeAI } from "google-generative-ai";

export default async function uploadVideo(prompt: String) {

  //
  console.log("sending to gemini");

  redirect(`/labs/1`);
  return {
    // if error return this otherwise redirect to another page
    message: "Some error message",
  };
}
