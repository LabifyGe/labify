"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadVideo from "@/app/actions/uploadVideo";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import {GoogleGenerativeAI } from "google-generative-ai";


const initialState = {
  message: "",
};

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/ffmpeg-core/dist/ffmpeg-core.js",
});

import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SpeechRecognition = (audioFile) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(`2ad31b78d8ea4662bf1118adfb50b547`, `germanywestcentral`);
  speechConfig.speechRecognitionLanguage = "en-US";

  let audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
  let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  speechRecognizer.recognizeOnceAsync(result => {
    switch (result.reason) {
      case sdk.ResultReason.RecognizedSpeech:
        console.log(`RECOGNIZED: Text=${result.text}`);
        console.log("Confidence: " + result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
        // print whole text/result
        console.log(result);
        uploadVideo(result.text);
        break;
      case sdk.ResultReason.NoMatch:
        console.log("NOMATCH: Speech could not be recognized.");
        break;
      case sdk.ResultReason.Canceled:
        const cancellation = sdk.CancellationDetails.fromResult(result);
        console.log(`CANCELED: Reason=${cancellation.reason}`);

        if (cancellation.reason == sdk.CancellationReason.Error) {
          console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
          console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
          console.log("CANCELED: Did you set the speech resource key and region values?");
        }
        break;
        default : console.log("default");
    }
    speechRecognizer.close();
  });
};

const sendToGemini = async (text) => {
  const gemini = new GoogleGenerativeAI();
  const chatSession = new gemini.ChatSession('AIzaSyBtLyfQz57KPALQl1I9QOu-vcn_eogtuLs', 'gemini-pro');
  const result = await chatSession.sendMessage(text);
  console.log(result);
}

export default function UploadVideo() {
  // const [state, formAction] = useFormState(uploadVideo, initialState);
  const [file, setFile] = useState<File | null>(null);
  const handleOnChange = (e) => {
    e.target.files && e.target.files[0] && setFile(e.target.files[0]);
    if(e.target.files && e.target.files[0]){
      const audioFile = e.target.files[0];
      console.log("started")
      SpeechRecognition(audioFile);
    }
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

  const convertToMp3 = async (video) => {
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

  //   create and append audio element
    const audio = new Audio(blobUrl);
    audio.controls = true;
    document.body.appendChild(audio);

  };

  useEffect(() => {
    sendToGemini("hello");
    load();
    convertToMp3(file);
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

                  {/*<p*/}
                  {/*  className="pt-1 text-sm tracking-wider text-gray-400 */}
                  {/*text-center group-hover:text-gray-600"*/}
                  {/*>*/}
                  {/*  {file ? file.name : "Upload File"}*/}
                  {/*</p>*/}
                  {/*{state.message && (*/}
                  {/*  <p className="pt-1 text-sm tracking-wider text-red-400 group-hover:text-gray-600">*/}
                  {/*    {state.message}*/}
                  {/*  </p>*/}
                  {/*)}*/}
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
