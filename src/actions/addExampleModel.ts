"use server";
import prisma from "@/lib/prisma";
// maybe install zod in future
// add server action to add prisma here
// Add prisma generate on vercel
// create app in google cloud and add secrets to login with google

export async function addExampleModel(title: string) {
  const newModel = await prisma.exampleModel.create({
    data: {
      title: title,
    },
  });
  return newModel;
}
