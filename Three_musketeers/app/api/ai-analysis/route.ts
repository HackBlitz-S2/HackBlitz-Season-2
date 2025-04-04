import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { transactions, timeframe } = await request.json()

    // Generate AI analysis based on transaction data
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze the following financial transactions for the ${timeframe} timeframe and provide insights:
      ${JSON.stringify(transactions)}
      
      Please provide:
      1. Key spending patterns
      2. Anomalies or unusual spending
      3. Budget recommendations
      4. Savings opportunities
      
      Format the response as JSON with these sections.`,
    })

    // Parse the AI response
    const analysis = JSON.parse(text)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error generating AI analysis:", error)
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 })
  }
}

