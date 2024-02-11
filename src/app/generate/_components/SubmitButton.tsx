"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  isFileTouched: boolean;
};

export function SubmitButton({ isFileTouched }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="default"
      type="submit"
      disabled={pending || !isFileTouched}
    >
      {pending ? "Generating..." : "Submit"}
    </Button>
  );
}
