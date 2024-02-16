import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: Request) {
    try {
        const res = await request.json()
        const { text } = res
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Generate Lab from provided text, the Lab is a form of exercise which start with brief overview of learning objective, then couple of examples, then exercises with hints, usually labs contain programmin exercises. Please provide in markdwon format TEXT:: ${text}` }],
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