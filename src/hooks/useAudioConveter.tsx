import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

type useAudioConveterProps = {
}

const ffmpeg = createFFmpeg({
    log: true,
    corePath: "./ffmpeg-core/dist/ffmpeg-core.js",
});

export default function useAudioConveter({ }: useAudioConveterProps) {

    const [ready, setReady] = useState(false);
    const [converting, setConverting] = useState(false);
    const [percent, setPercent] = useState(0);

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    };

    const convert = async (video: File, format: AudioFormatType) => {
        setConverting(true);
        const ext = video.name.split(".").pop();
        ffmpeg.FS("writeFile", `input${ext}`, await fetchFile(video));

        ffmpeg.setProgress(({ ratio }) => {
            setPercent(Number(ratio.toFixed(2)) * 100);
        });

        switch (format) {
            case "mp3":
                await ffmpeg.run("-i", `input${ext}`, "-q:a", "0", "-map", "a", "out.mp3");
                break;
            case "aac":
                await ffmpeg.run("-i", `input${ext}`, "-vn", "-acodec", "copy", "out.aac");
                break;
            case "wav":
                await ffmpeg.run("-i", `input${ext}`, "out.wav");
                break;
            default:
                break;
        }
        const data = ffmpeg.FS("readFile", `out.${format}`);
        // const name = `${video.name.split(".").shift()}.${format}`;
        // const size = (data.length / 1024 / 1024).toFixed(1) + "MB";
        const name = video.name.replace(/\.[^/.]+$/, "");
        const size = (data.length / 1024 / 1024).toFixed(1) + "MB";

        const blobUrl = URL.createObjectURL(
            new Blob([data.buffer], { type: "audio/mpeg" })
        );

        setConverting(false);
        return { blobUrl, name, size };
    }


    useEffect(() => {
        load();
    }, [])

    return { ready, convert, converting, percent }
}