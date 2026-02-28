import { type Hexagram } from "@/lib/iching-data"
import { questions } from "@/lib/iching-data"
import { isLocale, localizeQuestions, type Locale } from "@/lib/i18n"

export async function POST(req: Request) {
  const { hexagram, answers } = (await req.json()) as {
    hexagram: Hexagram
    answers: Record<string, string>
  }

  const readingLanguage: Locale =
    typeof answers.reading_language === "string" && isLocale(answers.reading_language)
      ? answers.reading_language
      : "english"
  const localizedQuestions = localizeQuestions(questions, readingLanguage)

  const answerLabel =
    readingLanguage === "zh_hant"
      ? "回答"
      : readingLanguage === "zh_hans"
        ? "回答"
        : "Answer"

  // Build a context summary of the user's answers
  const answerSummary = Object.entries(answers)
    .filter(([id]) => id !== "reading_language")
    .map(([id, value]) => {
      const question = localizedQuestions.find((q) => q.id === id)
      if (!question) return ""
      const selectedOption = question.options.find((o) => o.value === value)
      return `${question.category}: ${question.question}\n${answerLabel}: ${selectedOption?.label || value}`
    })
    .filter(Boolean)
    .join("\n\n")

  const contextLines = answerSummary.split("\n\n").filter(Boolean)
  const reading = buildOfflineReading({
    locale: readingLanguage,
    hexagram,
    contextLines,
  })

  return Response.json({ reading })
}

function buildOfflineReading({
  locale,
  hexagram,
  contextLines,
}: {
  locale: Locale
  hexagram: Hexagram
  contextLines: string[]
}) {
  const contextPreview = contextLines
    .slice(0, 4)
    .map((line) => line.replace(/\n/g, " - "))
    .join(locale === "english" ? "; " : "；")

  if (locale === "zh_hant") {
    return [
      `你所得為第${hexagram.number}卦「${hexagram.chineseName}」。`,
      `你此刻的關鍵處境包括：${contextPreview || "你正處於需要重新校準步伐的時刻"}。`,
      "卦義提醒你在流變之中守住本心；卦辭主張審時而進；象傳則勸你先整合內外，再推動關鍵一步。",
      "此卦提醒你先安定內在，再推進外在行動。若遇阻隔，不必強行突破，先調整節奏、整合關係與資源，時機成熟再前行。",
      "接下來可做三件事：第一，聚焦一件最重要的事；第二，減少分散注意力的承諾；第三，以穩定且可持續的步伐連續實踐七日。如此，變化會由內而外展開。",
    ].join("\n\n")
  }

  if (locale === "zh_hans") {
    return [
      `你所得为第${hexagram.number}卦「${hexagram.chineseName}」。`,
      `你此刻的关键处境包括：${contextPreview || "你正处于需要重新校准步伐的时刻"}。`,
      "卦义提醒你在流变之中守住本心；卦辞主张审时而进；象传则劝你先整合内外，再推动关键一步。",
      "此卦提醒你先安定内在，再推进外在行动。若遇阻隔，不必强行突破，先调整节奏、整合关系与资源，时机成熟再前行。",
      "接下来可做三件事：第一，聚焦一件最重要的事；第二，减少分散注意力的承诺；第三，以稳定且可持续的步伐连续实践七日。如此，变化会由内而外展开。",
    ].join("\n\n")
  }

  return [
    `You drew Hexagram ${hexagram.number}: ${hexagram.name} (${hexagram.chineseName}).`,
    `Your present situation highlights: ${contextPreview || "a period that asks for recalibration and patience"}.`,
    `The core meaning is "${hexagram.meaning}." The Judgment says "${hexagram.judgment}" and the Image says "${hexagram.image}".`,
    "This reading points to steady inner alignment before outer force. If you feel blocked, do not push harder first. Clarify priorities, strengthen useful alliances, and move when timing supports momentum.",
    "For the next seven days: choose one essential action, remove one draining distraction, and maintain one daily grounding practice. Small consistency now creates clear movement forward.",
  ].join("\n\n")
}
