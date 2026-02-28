import { generateText } from "ai"
import { isLocale } from "@/lib/i18n"
import { type Hexagram } from "@/lib/iching-data"

export async function POST(req: Request) {
  const { hexagram, locale } = (await req.json()) as {
    hexagram: Hexagram
    locale: string
  }

  if (!isLocale(locale) || locale === "english") {
    return Response.json({
      meaning: hexagram.meaning,
      judgment: hexagram.judgment,
      image: hexagram.image,
    })
  }

  const targetLanguage =
    locale === "zh_hant" ? "Traditional Chinese (繁體中文)" : "Simplified Chinese (简体中文)"

  try {
    const result = await generateText({
      model: "anthropic/claude-sonnet-4",
      system:
        "You are a precise translator for I Ching texts. Keep spiritual and classical tone while remaining natural and readable.",
      prompt: `Translate the following I Ching text into ${targetLanguage}.

Requirements:
- Preserve meaning accurately.
- Keep concise and literary style.
- Do not add explanation.
- Return valid JSON only.
- JSON format:
{"meaning":"...","judgment":"...","image":"..."}

Hexagram ${hexagram.number}: ${hexagram.name} (${hexagram.chineseName})
Meaning: ${hexagram.meaning}
Judgment: ${hexagram.judgment}
Image: ${hexagram.image}`,
      temperature: 0.2,
      maxOutputTokens: 600,
    })

    const jsonStart = result.text.indexOf("{")
    const jsonEnd = result.text.lastIndexOf("}")
    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      throw new Error("No JSON object found in translation response")
    }

    const parsed = JSON.parse(result.text.slice(jsonStart, jsonEnd + 1)) as {
      meaning?: string
      judgment?: string
      image?: string
    }

    if (!parsed.meaning || !parsed.judgment || !parsed.image) {
      throw new Error("Incomplete translation payload")
    }

    return Response.json({
      meaning: parsed.meaning,
      judgment: parsed.judgment,
      image: parsed.image,
    })
  } catch (error) {
    console.error("Failed to translate hexagram text:", error)
    return Response.json(
      {
        meaning: hexagram.meaning,
        judgment: hexagram.judgment,
        image: hexagram.image,
      },
      { status: 200 }
    )
  }
}
