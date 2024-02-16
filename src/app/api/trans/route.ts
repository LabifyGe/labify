import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        // 'kO1kgl0p-Hw'
        const rtes = await YoutubeTranscript.fetchTranscript(id!);
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