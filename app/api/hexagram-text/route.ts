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

  // Offline mode: no external AI translation.
  // For now, return canonical source text.
  return Response.json({
    meaning: hexagram.meaning,
    judgment: hexagram.judgment,
    image: hexagram.image,
    localeHint: targetLanguage,
  })
}
