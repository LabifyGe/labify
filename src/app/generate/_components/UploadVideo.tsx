"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadVideo from "@/app/actions/uploadVideo";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const initialState = {
  message: "",
};

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/ffmpeg-core/dist/ffmpeg-core.js",
  // corePath: "./node_modules/@ffmpeg/core/ffmpeg-core.js",
});

export default function UploadVideo() {
  const [state, formAction] = useFormState(uploadVideo, initialState);
  const [file, setFile] = useState<File | null>(null);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && e.target.files[0] && setFile(e.target.files[0]);
  };
  const [ready, setReady] = useState(false);
  const load = async () => {
    console.group("load");
    await ffmpeg.load();
    setReady(true);
    console.groupEnd();
    console.log("ready");
  };
  const handleOnClick = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    convertToMp3(file)
  }

  const convertToMp3 = async (video: File) => {
    const ext = "mp4";
    // Write the file to memory
    ffmpeg.FS("writeFile", `input${ext}`, await fetchFile(video));
    // Run the FFmpeg command
    // await ffmpeg.run("-i", `input${ext}`, "-vn", "-acodec", "copy", "out.aac");
    await ffmpeg.run("-i", `input${ext}`, "-q:a", "0", "-map", "a", "out.mp3");
    const data = ffmpeg.FS("readFile", "out.mp3");

    const name = video.name.replace(/\.[^/.]+$/, "");
    const size = (data.length / 1024 / 1024).toFixed(1) + "MB";

    const blobUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mp3" })
    );

    // setConverting(false);
    // setAudioFiles([...audioFiles, { blobUrl, name, size }]);

    // donwload the file
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${name}.mp3`;
    a.click();
    console.log("done");
  };

  useEffect(() => {
    load();
  },[])

  if (!ready) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
            {/* <SubmitButton  isFileTouched={!!file} /> */}
            <Button onClick={handleOnClick} >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
