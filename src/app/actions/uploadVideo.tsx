"use server";
// import { redirect } from "next/navigation";
// import * as sdk from "microsoft-cognitiveservices-speech-sdk"

// const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY!, process.env.SPEECH_REGION!);
// speechConfig.speechRecognitionLanguage = "en-US";
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
// const ffmpegStatic = require('ffmpeg-static');
// const ffmpeg = require('fluent-ffmpeg');
// import { FfmpegCommand } from "fluent-ffmpeg";
// @ts-ignore
// import * as ffmpeg from "ffmpeg";


export default async function uploadVideo(prevState: any, formData: FormData) {
  // var command = new FfmpegCommand();
  // const video = formData.get("video") as File;
  // if (!video) {
  //   return {
  //     message: 'Please upload a video',
  //   }
  // }
  // try {
  //   new ffmpeg('/path/to/your_movie.avi', function (err: any, video: any) {
  //     if (!err) {
  //       console.log('The video is ready to be processed');
  //     } else {
  //       console.log('Error: ' + err);
  //     }
  //   });
  // } catch (e: any) {
  //   console.log(e.code);
  //   console.log(e.msg);
  // }
  // const ext = video.name.split(".").pop();
  // const format = "wav";
  // await ffmpeg.load();
  // ffmpeg.FS("writeFile", `input${ext}`, await fetchFile(video));
  // await ffmpeg.run("-i", `input${ext}`, `out.${format}`);
  // const data = ffmpeg.FS("readFile", `out.${format}`);

  // let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("out.wav"));
  // let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  // speechRecognizer.recognizeOnceAsync(result => {
  //   switch (result.reason) {
  //     case sdk.ResultReason.RecognizedSpeech:
  //       console.log(`RECOGNIZED: Text=${result.text}`);
  //       break;
  //     case sdk.ResultReason.NoMatch:
  //       console.log("NOMATCH: Speech could not be recognized.");
  //       break;
  //     case sdk.ResultReason.Canceled:
  //       const cancellation = sdk.CancellationDetails.fromResult(result);
  //       console.log(`CANCELED: Reason=${cancellation.reason}`);

  //       if (cancellation.reason == sdk.CancellationReason.Error) {
  //         console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
  //         console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
  //         console.log("CANCELED: Did you set the speech resource key and region values?");
  //       }
  //       break;
  //   }
  //   speechRecognizer.close();
  // });

  return {
    message: 'Please enter a valid email',
  }
}

