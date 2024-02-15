"use client";

import { FaCloudUploadAlt } from "react-icons/fa";
import uploadVideo from "@/app/actions/uploadVideo";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import {pp} from "./pp"


const initialState = {
  message: "",
};

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/ffmpeg-core/dist/ffmpeg-core.js",
});
const fetchData = async (prompt: string) => {
  try {
    const apiKey = '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'; // Replace with your actual OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace with the correct API endpoint

    console.log('Fetching data...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are lab expert teacher and mentor who can create amazing programming and math exercises. you must use html language to generate question and answers, explanations and exercises, ${pp},' },
          { role: 'user', content: ` Generate exercises and question from the following text: ${prompt}` },
        ],
      }),
    });

    const data = await response.json();


    // Handle the response data as needed
    console.log('OpenAI API Response:', data.choices[0].message.content);
    // setResponse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SpeechRecognition = (audioFile: File) => {
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

export default function UploadVideo() {
  // const [state, formAction] = useFormState(uploadVideo, initialState);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const convertToMp3 = async (video: File) => {
    const ext = "mp4";
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

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${name}.mp3`;
    a.click();
    console.log("done");

    const audio = new Audio(blobUrl);
    audio.controls = true;
    document.body.appendChild(audio);

  };

  useEffect(() => {
    // const file = new Blob(["Variables and Data Types\n" +
    fetchData("Variables and Data Types\n" +
        "In the previous chapter, you learned that a variable is a unit of data with an identifier, which is held in\n" +
        "your computer's memory; it can be changed by putting a new value into it or modifying the value that is\n" +
        "already there. In this chapter, I will be introducing some of the different types of variable that are\n" +
        "available for you to use in your programs, and I’ll be showing you how to build them into the expressions\n" +
        "and statements of Python that will allow you to turn your designs into working code. This is where you\n" +
        "start to do some real programming. You will be creating two programs from scratch in this chapter: one\n" +
        "to manipulate and format simple text strings and a script that performs a mathematical calculation. All\n" +
        "this is made possible by using variables.\n" +
        "Using variables allows you to specify a calculation or method for getting a result without having to\n" +
        "know what values those variables will refer to beforehand. Any information that is put into the system\n" +
        "must be turned into a variable before you can do anything to it, and it will be the contents of a variable\n" +
        "that finally get sent back to the user that called the program.\n" +
        "\n" +
        "Choosing Good Identifiers\n" +
        "Identifiers are the names used to identify things in your code. Python will regard any word that has not\n" +
        "been commented out, delimited by quotation marks, or escaped in some other way as an identifier of\n" +
        "some kind.\n" +
        "An identifier is just a name label, so it could refer to more or less anything including commands, so\n" +
        "it helps to keep things readable and understandable if you choose sensible names. You need to be\n" +
        "careful to avoid choosing names that are already being used in your current Python session to identify\n" +
        "your new variables. Choosing the same name as something else can make the original item with that\n" +
        "name inaccessible.\n" +
        "This could be particularly bad if the name you choose is an essential part of the Python language,\n" +
        "but luckily Python does not allow you to name variables after any essential parts of the language.\n" +
        "Therefore, the next section contains an overview of the most important words used in Python, so you\n" +
        "can avoid this problem; this is the territory that you will be exploring and learning to work with over the\n" +
        "course of this book.\n" +
        "\n" +
        "Python Keywords\n" +
        "The following words are the keywords, which form the basis of the Python language. You are not allowed\n" +
        "to use these words to name your variables, because these are the core commands of Python. They must" );
    load();
    convertToMp3(file!);
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
