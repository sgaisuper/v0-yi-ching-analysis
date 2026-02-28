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

  if (locale === "zh_hant") {
    return Response.json({
      meaning: `第${hexagram.number}卦「${hexagram.chineseName}」提示你在變化中守正，以柔韌與清明回應當前課題。`,
      judgment: "此卦主張審時度勢、守中有進；先安內後攘外，循序而行則可得吉。",
      image: "觀其象，宜整合人心與資源，持續精進，於穩定之中推動轉化。",
    })
  }

  return Response.json({
    meaning: `第${hexagram.number}卦「${hexagram.chineseName}」提示你在变化中守正，以柔韧与清明回应当下课题。`,
    judgment: "此卦主张审时度势、守中有进；先安内后攘外，循序而行则可得吉。",
    image: "观其象，宜整合人心与资源，持续精进，于稳定之中推动转化。",
  })
}
