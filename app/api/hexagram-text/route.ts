import { generateObject } from "ai"
import { z } from "zod"
import { isLocale } from "@/lib/i18n"
import { type Hexagram } from "@/lib/iching-data"

const translatedHexagramSchema = z.object({
  meaning: z.string(),
  judgment: z.string(),
  image: z.string(),
})

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
    const result = await generateObject({
      model: "anthropic/claude-sonnet-4",
      schema: translatedHexagramSchema,
      system:
        "You are a precise translator for I Ching texts. Keep spiritual and classical tone while remaining natural and readable.",
      prompt: `Translate the following I Ching text into ${targetLanguage}.

Requirements:
- Preserve meaning accurately.
- Keep concise and literary style.
- Do not add explanation.
- Return only the translated fields.

Hexagram ${hexagram.number}: ${hexagram.name} (${hexagram.chineseName})
Meaning: ${hexagram.meaning}
Judgment: ${hexagram.judgment}
Image: ${hexagram.image}`,
      temperature: 0.2,
      maxOutputTokens: 600,
    })

    return Response.json(result.object)
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
