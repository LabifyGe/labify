import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: Request) {
    try {
        const res = await request.json()
        const { text } = res
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Create some task about that and call whole document markdwon dont ask me anything jist give me answer in markdwon format: ${text}` }],
            model: 'gpt-3.5-turbo',
        });
        const resppp = chatCompletion.choices[0]?.message?.content
        return Response.json({
            result: resppp
        })
    } catch (error) {
        console.log("lab error", error)
        return Response.json({
            result: "ERROR"
        })
    }

}