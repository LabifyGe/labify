import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const rtes = await YoutubeTranscript.fetchTranscript(id!);
        console.log(rtes)
        const m = rtes.map((rte) => rte.text).join(" ")
        return Response.json({
            result: m
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            result: "ERROR"
        })
    }

}