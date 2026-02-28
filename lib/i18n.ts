import { type QuestionnaireQuestion } from "@/lib/iching-data"

export type Locale = "english" | "zh_hans" | "zh_hant"

export const localeOptions: { value: Locale; label: string }[] = [
  { value: "english", label: "English" },
  { value: "zh_hans", label: "简体中文" },
  { value: "zh_hant", label: "繁體中文" },
]

export const defaultLocale: Locale = "english"

export function isLocale(value: string): value is Locale {
  return value === "english" || value === "zh_hans" || value === "zh_hant"
}

type UIStrings = {
  appTitle: string
  heroEyebrow: string
  heroDescription: string
  beginReading: string
  startOver: string
  yourReading: string
  footerNote: string
  questionOf: (current: number, total: number) => string
  previous: string
  continue: string
  revealReading: string
  yourHexagram: string
  hexagram: string
  trigramOver: string
  meaning: string
  judgment: string
  image: string
  personalReading: string
  loadingReading: string
  errorOracleUnavailable: string
  shareReading: string
  sharing: string
  consultAgain: string
  sharedSuccess: string
  copiedSuccess: string
  shareUnsupported: string
  shareFailed: string
  shareFallbackText: string
  shareTitlePrefix: string
  shareHeading: string
}

const uiStrings: Record<Locale, UIStrings> = {
  english: {
    appTitle: "Yi Ching Oracle",
    heroEyebrow: "Ancient Wisdom for Modern Life",
    heroDescription:
      "Answer questions about your current situation and receive a personalized hexagram reading guided by 3,000 years of wisdom from the Book of Changes.",
    beginReading: "Begin Your Reading",
    startOver: "Start Over",
    yourReading: "Your Reading",
    footerNote:
      "The Yi Ching (I Ching), or Book of Changes, is an ancient Chinese divination text dating back over 3,000 years. These readings are for contemplation and personal reflection.",
    questionOf: (current, total) => `Question ${current} of ${total}`,
    previous: "Previous",
    continue: "Continue",
    revealReading: "Reveal My Reading",
    yourHexagram: "Your Hexagram",
    hexagram: "Hexagram",
    trigramOver: "over",
    meaning: "Meaning",
    judgment: "The Judgment",
    image: "The Image",
    personalReading: "Your Personal Reading",
    loadingReading: "The oracle is contemplating your situation...",
    errorOracleUnavailable: "The oracle is momentarily unavailable. Please try again.",
    shareReading: "Share Reading",
    sharing: "Sharing...",
    consultAgain: "Consult the Oracle Again",
    sharedSuccess: "Reading shared.",
    copiedSuccess: "Reading copied to clipboard.",
    shareUnsupported: "Sharing is not supported on this device.",
    shareFailed: "Unable to share right now. Please try again.",
    shareFallbackText:
      "I received an I Ching reading and wanted to share it with you.",
    shareTitlePrefix: "Yi Ching Reading",
    shareHeading: "Yi Ching Oracle Reading",
  },
  zh_hans: {
    appTitle: "易经神谕",
    heroEyebrow: "古老智慧，照见现代人生",
    heroDescription:
      "回答关于你当下处境的问题，获得一则个性化卦象解读，汲取《易经》三千年的智慧。",
    beginReading: "开始占读",
    startOver: "重新开始",
    yourReading: "你的解读",
    footerNote:
      "《易经》（I Ching）又称《周易》，是有三千多年历史的中国古代经典。此处解读仅供沉思与自我观照。",
    questionOf: (current, total) => `问题 ${current} / ${total}`,
    previous: "上一步",
    continue: "继续",
    revealReading: "查看我的解读",
    yourHexagram: "你的卦象",
    hexagram: "卦",
    trigramOver: "上",
    meaning: "卦义",
    judgment: "卦辞",
    image: "象传",
    personalReading: "你的专属解读",
    loadingReading: "神谕正在观照你的处境...",
    errorOracleUnavailable: "神谕暂时不可用，请稍后再试。",
    shareReading: "分享解读",
    sharing: "分享中...",
    consultAgain: "再次请示神谕",
    sharedSuccess: "已分享解读。",
    copiedSuccess: "解读已复制到剪贴板。",
    shareUnsupported: "此设备不支持分享。",
    shareFailed: "暂时无法分享，请稍后再试。",
    shareFallbackText: "我刚刚得到一则易经解读，想分享给你。",
    shareTitlePrefix: "易经解读",
    shareHeading: "易经神谕解读",
  },
  zh_hant: {
    appTitle: "易經神諭",
    heroEyebrow: "古老智慧，映照現代人生",
    heroDescription:
      "回答關於你當下處境的問題，獲得一則個人化卦象解讀，汲取《易經》三千年的智慧。",
    beginReading: "開始占讀",
    startOver: "重新開始",
    yourReading: "你的解讀",
    footerNote:
      "《易經》（I Ching）又稱《周易》，是有三千多年歷史的中國古代經典。此處解讀僅供沉思與自我觀照。",
    questionOf: (current, total) => `問題 ${current} / ${total}`,
    previous: "上一步",
    continue: "繼續",
    revealReading: "查看我的解讀",
    yourHexagram: "你的卦象",
    hexagram: "卦",
    trigramOver: "上",
    meaning: "卦義",
    judgment: "卦辭",
    image: "象傳",
    personalReading: "你的專屬解讀",
    loadingReading: "神諭正在觀照你的處境...",
    errorOracleUnavailable: "神諭暫時不可用，請稍後再試。",
    shareReading: "分享解讀",
    sharing: "分享中...",
    consultAgain: "再次請示神諭",
    sharedSuccess: "已分享解讀。",
    copiedSuccess: "解讀已複製到剪貼簿。",
    shareUnsupported: "此裝置不支援分享。",
    shareFailed: "暫時無法分享，請稍後再試。",
    shareFallbackText: "我剛剛得到一則易經解讀，想分享給你。",
    shareTitlePrefix: "易經解讀",
    shareHeading: "易經神諭解讀",
  },
}

type QuestionTextTranslation = {
  category: string
  question: string
  options: Record<string, string>
}

const questionTranslations: Record<
  Exclude<Locale, "english">,
  Record<string, QuestionTextTranslation>
> = {
  zh_hans: {
    life_phase: {
      category: "人生概况",
      question: "以下哪一项最符合你目前的人生阶段？",
      options: {
        beginning: "一个新的开始",
        growth: "稳步成长的阶段",
        transition: "转变或变动的时刻",
        reflection: "反思与整合的时期",
        challenge: "充满不确定或挑战的阶段",
      },
    },
    emotional_state: {
      category: "内在状态",
      question: "你会如何形容自己此刻的情绪状态？",
      options: {
        calm: "平静且稳定",
        anxious: "焦虑或不安",
        hopeful: "充满希望与乐观",
        conflicted: "矛盾或拉扯",
        weary: "疲惫但仍坚定",
      },
    },
    career: {
      category: "事业与使命",
      question: "你对工作或事业目前最主要的关注是什么？",
      options: {
        seeking: "寻找新的方向或机会",
        conflict: "应对职场冲突或挑战",
        meaning: "渴望更深层的意义与满足",
        building: "从零开始打造一件事",
        stability: "维持稳定与持续性",
      },
    },
    relationships: {
      category: "关系",
      question: "你最亲近的人际关系目前状态如何？",
      options: {
        harmonious: "和谐且互相支持",
        strained: "紧张或疏远",
        healing: "正处于修复过程",
        deepening: "持续加深与演进",
        isolated: "我感到有些孤立",
      },
    },
    health: {
      category: "健康与活力",
      question: "你会如何评价自己目前的身心能量？",
      options: {
        abundant: "充沛而有活力",
        steady: "稳定但仍可更好",
        low: "偏低，需要恢复",
        fluctuating: "起伏不定",
        recovering: "正在从耗竭中恢复",
      },
    },
    finances: {
      category: "物质与资源",
      question: "哪一项最符合你与金钱、资源的关系？",
      options: {
        secure: "感到安全且丰足",
        working: "正努力迈向更稳健",
        scarcity: "经历匮乏或担忧",
        risk: "正在承担风险或进行投资",
        content: "学习知足常乐",
      },
    },
    spiritual: {
      category: "精神与成长",
      question: "此刻促使你寻求指引的原因是什么？",
      options: {
        decision: "有重大决定在前方",
        understanding: "渴望更深的自我理解",
        lost: "感到迷失，正在寻找方向",
        curiosity: "好奇未来可能如何展开",
        confirmation: "希望确认自己选择的道路",
      },
    },
    change: {
      category: "变化与转化",
      question: "你通常如何回应变化？",
      options: {
        embrace: "把它视为机会并拥抱它",
        resist: "起初抗拒，但最终会适应",
        overwhelmed: "常被变化压得喘不过气",
        careful: "谨慎规划、缓慢推进",
        lesson: "寻找变化中的课题与启示",
      },
    },
  },
  zh_hant: {
    life_phase: {
      category: "人生概況",
      question: "以下哪一項最符合你目前的人生階段？",
      options: {
        beginning: "一個新的開始",
        growth: "穩步成長的階段",
        transition: "轉變或變動的時刻",
        reflection: "反思與整合的時期",
        challenge: "充滿不確定或挑戰的階段",
      },
    },
    emotional_state: {
      category: "內在狀態",
      question: "你會如何形容自己此刻的情緒狀態？",
      options: {
        calm: "平靜且穩定",
        anxious: "焦慮或不安",
        hopeful: "充滿希望與樂觀",
        conflicted: "矛盾或拉扯",
        weary: "疲憊但仍堅定",
      },
    },
    career: {
      category: "事業與使命",
      question: "你對工作或事業目前最主要的關注是什麼？",
      options: {
        seeking: "尋找新的方向或機會",
        conflict: "應對職場衝突或挑戰",
        meaning: "渴望更深層的意義與滿足",
        building: "從零開始打造一件事",
        stability: "維持穩定與持續性",
      },
    },
    relationships: {
      category: "關係",
      question: "你最親近的人際關係目前狀態如何？",
      options: {
        harmonious: "和諧且互相支持",
        strained: "緊張或疏遠",
        healing: "正處於修復過程",
        deepening: "持續加深與演進",
        isolated: "我感到有些孤立",
      },
    },
    health: {
      category: "健康與活力",
      question: "你會如何評價自己目前的身心能量？",
      options: {
        abundant: "充沛而有活力",
        steady: "穩定但仍可更好",
        low: "偏低，需要恢復",
        fluctuating: "起伏不定",
        recovering: "正在從耗竭中恢復",
      },
    },
    finances: {
      category: "物質與資源",
      question: "哪一項最符合你與金錢、資源的關係？",
      options: {
        secure: "感到安全且豐足",
        working: "正努力邁向更穩健",
        scarcity: "經歷匱乏或擔憂",
        risk: "正在承擔風險或進行投資",
        content: "學習知足常樂",
      },
    },
    spiritual: {
      category: "精神與成長",
      question: "此刻促使你尋求指引的原因是什麼？",
      options: {
        decision: "有重大決定在前方",
        understanding: "渴望更深的自我理解",
        lost: "感到迷失，正在尋找方向",
        curiosity: "好奇未來可能如何展開",
        confirmation: "希望確認自己選擇的道路",
      },
    },
    change: {
      category: "變化與轉化",
      question: "你通常如何回應變化？",
      options: {
        embrace: "把它視為機會並擁抱它",
        resist: "起初抗拒，但最終會適應",
        overwhelmed: "常被變化壓得喘不過氣",
        careful: "謹慎規劃、緩慢推進",
        lesson: "尋找變化中的課題與啟示",
      },
    },
  },
}

export function getUIStrings(locale: Locale): UIStrings {
  return uiStrings[locale] || uiStrings[defaultLocale]
}

export function localizeQuestion(question: QuestionnaireQuestion, locale: Locale): QuestionnaireQuestion {
  if (locale === "english") {
    return question
  }

  const translatedQuestion = questionTranslations[locale][question.id]
  if (!translatedQuestion) {
    return question
  }

  return {
    ...question,
    category: translatedQuestion.category,
    question: translatedQuestion.question,
    options: question.options.map((option) => ({
      ...option,
      label: translatedQuestion.options[option.value] || option.label,
    })),
  }
}

export function localizeQuestions(
  sourceQuestions: QuestionnaireQuestion[],
  locale: Locale
): QuestionnaireQuestion[] {
  return sourceQuestions.map((question) => localizeQuestion(question, locale))
}

const trigramMap: Record<string, { zh_hans: string; zh_hant: string }> = {
  Heaven: { zh_hans: "天", zh_hant: "天" },
  Earth: { zh_hans: "地", zh_hant: "地" },
  Water: { zh_hans: "水", zh_hant: "水" },
  Fire: { zh_hans: "火", zh_hant: "火" },
  Thunder: { zh_hans: "雷", zh_hant: "雷" },
  Mountain: { zh_hans: "山", zh_hant: "山" },
  Wind: { zh_hans: "风", zh_hant: "風" },
  Lake: { zh_hans: "泽", zh_hant: "澤" },
}

export function localizeTrigram(trigram: string, locale: Locale): string {
  if (locale === "english") return trigram
  const found = trigramMap[trigram]
  if (!found) return trigram
  return locale === "zh_hant" ? found.zh_hant : found.zh_hans
}
