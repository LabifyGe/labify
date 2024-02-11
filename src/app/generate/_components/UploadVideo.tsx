"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadVideo from "@/app/actions/uploadVideo";
import { ChangeEvent, useState } from "react";

const initialState = {
  message: "",
};

export default function UploadVideo() {
  const [state, formAction] = useFormState(uploadVideo, initialState);
  const [file, setFile] = useState<File | null>(null);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && e.target.files[0] && setFile(e.target.files[0]);
  };
  return (
    <form action={formAction}>
      <div className="flex justify-center mt-20 ">
        <div className="max-w-[300px] rounded-lg  w-full">
          <div className="m-4 ">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-secondary cursor-pointer rounded-lg">
                <div className="flex flex-col items-center justify-center pt-7">
                  <FaCloudUploadAlt className="text-3xl " />

                  <p
                    className="pt-1 text-sm tracking-wider text-gray-400 
                  text-center group-hover:text-gray-600"
                  >
                    {file ? file.name : "Upload File"}
                  </p>
                  {state.message && (
                    <p className="pt-1 text-sm tracking-wider text-red-400 group-hover:text-gray-600">
                      {state.message}
                    </p>
                  )}
                </div>
                <input
                  onChange={handleOnChange}
                  type="file"
                  name="video"
                  className="opacity-0 hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <SubmitButton isFileTouched={!!file} />
          </div>
        </div>
      </div>
    </form>
  );
}
