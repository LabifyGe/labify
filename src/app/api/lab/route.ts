import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: Request) {
    try {
        const res = await request.json()
        const { text } = res


        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `You should create labs(practice task) based on this text markdwon format: ${text}` }],
            model: 'gpt-3.5-turbo',
        });

        // console.log(chatCompletion); // 'Hello, world!
        const resppp = chatCompletion.choices[0]?.message?.content
        // console.log(resppp)
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