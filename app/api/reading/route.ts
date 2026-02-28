import { streamText } from "ai"
import { type Hexagram } from "@/lib/iching-data"
import { questions } from "@/lib/iching-data"

export async function POST(req: Request) {
  const { hexagram, answers } = (await req.json()) as {
    hexagram: Hexagram
    answers: Record<string, string>
  }

  const readingLanguage = answers.reading_language || "english"
  const languageInstruction =
    readingLanguage === "zh_hant"
      ? "Write the full reading in Traditional Chinese (繁體中文)."
      : readingLanguage === "zh_hans"
        ? "Write the full reading in Simplified Chinese (简体中文)."
        : "Write the full reading in English."

  // Build a context summary of the user's answers
  const answerSummary = Object.entries(answers)
    .filter(([id]) => id !== "reading_language")
    .map(([id, value]) => {
      const question = questions.find((q) => q.id === id)
      if (!question) return ""
      const selectedOption = question.options.find((o) => o.value === value)
      return `${question.category}: ${question.question}\nAnswer: ${selectedOption?.label || value}`
    })
    .filter(Boolean)
    .join("\n\n")

  const result = streamText({
    model: "anthropic/claude-sonnet-4",
    system: `You are a wise Yi Ching (I Ching) oracle interpreter with deep knowledge of Chinese philosophy, Taoist wisdom, and the Book of Changes. 
    
Your role is to provide a thoughtful, personalized interpretation of an I Ching hexagram reading based on the querent's current life situation.

Guidelines:
- Write in a contemplative, poetic yet accessible tone
- Reference the specific hexagram's traditional meaning and imagery
- Connect the hexagram's wisdom directly to the person's stated situation
- Offer practical guidance grounded in the hexagram's philosophy
- Use metaphors from nature and the five elements where appropriate
- Be encouraging but honest — the I Ching does not shy from difficult truths
- Keep the reading focused and meaningful, roughly 300-400 words
- Structure the reading with natural paragraph breaks
- Do not use markdown headers or bullet points — write in flowing prose
- Address the reader directly as "you"
- ${languageInstruction}`,
    prompt: `The querent has drawn Hexagram ${hexagram.number}: ${hexagram.name} (${hexagram.chineseName}).

Trigrams: ${hexagram.trigrams.upper} over ${hexagram.trigrams.lower}
Meaning: ${hexagram.meaning}
Judgment: ${hexagram.judgment}
Image: ${hexagram.image}

Here is a summary of their current life situation based on their questionnaire responses:

${answerSummary}

Please provide a deeply personal and insightful I Ching reading that weaves the hexagram's wisdom with their specific circumstances. Help them understand what this hexagram reveals about their path forward.`,
    temperature: 0.8,
    maxOutputTokens: 1500,
  })

  return result.toUIMessageStreamResponse()
}
