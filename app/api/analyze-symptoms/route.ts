import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'
import { createGroq } from '@ai-sdk/groq'

export const maxDuration = 30

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || ''
})

const SYSTEM_PROMPT = `You are MATRINOVA, an AI health assistant specialized in pregnancy care for rural women in India. 

IMPORTANT GUIDELINES:
1. Always respond in simple, easy-to-understand language
2. After analyzing symptoms, classify the risk level as one of: SAFE, WARNING, or EMERGENCY
3. Provide practical advice using locally available resources
4. For EMERGENCY cases, always recommend immediate medical attention
5. Be culturally sensitive and supportive
6. Include both English and Tamil translations for key advice

RESPONSE FORMAT:
- Start with a warm, reassuring greeting
- Acknowledge the symptoms mentioned
- Provide your risk assessment (SAFE/WARNING/EMERGENCY)
- Give practical advice
- Mention when to seek medical help
- End with encouragement

RISK CLASSIFICATION:
- SAFE: Normal pregnancy symptoms, no immediate concern
- WARNING: Symptoms that need monitoring, schedule doctor visit soon
- EMERGENCY: Severe symptoms requiring immediate medical attention (heavy bleeding, severe pain, no fetal movement, high fever, severe headache with vision changes)`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  console.log("Processing messages:", messages.length)

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
