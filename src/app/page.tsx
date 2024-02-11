import Thread from "@/components/main/form";
import SplitContainer from "@/components/shared/SplitContainer";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
export default async function Home() {
  const models = await prisma.exampleModel.findMany();

  return (
    <div>
      {/* <h1 className="text-xl font-bold">Examples</h1> */}
      {/* <Thread models={models} /> */}
      {/* <Button onClick={handleClick}>Click me</Button> */}
      <SplitContainer />
    </div>
  );
}
