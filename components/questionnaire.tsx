"use client"

import { useEffect, useMemo, useState } from "react"
import { questions, type QuestionnaireQuestion } from "@/lib/iching-data"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getUIStrings,
  localizeQuestions,
  type Locale,
  isLocale,
} from "@/lib/i18n"

interface QuestionnaireProps {
  onComplete: (answers: Record<string, string>) => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

function QuestionStep({
  question,
  selectedValue,
  onSelect,
}: {
  question: QuestionnaireQuestion
  selectedValue: string | undefined
  onSelect: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
          {question.category}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed text-balance">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              "group flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all duration-300",
              "hover:border-primary/60 hover:bg-primary/5",
              selectedValue === option.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                selectedValue === option.value
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40 group-hover:border-primary/60"
              )}
            >
              {selectedValue === option.value && (
                <span className="h-2 w-2 rounded-full bg-primary-foreground" />
              )}
            </span>
            <span className="text-sm md:text-base font-sans">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProgressBar({
  current,
  total,
  locale,
}: {
  current: number
  total: number
  locale: Locale
}) {
  const progress = ((current + 1) / total) * 100
  const t = getUIStrings(locale)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
        <span>{t.questionOf(current + 1, total)}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export function Questionnaire({ onComplete, locale, onLocaleChange }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({
    reading_language: locale,
  })
  const localizedQuestions = useMemo(
    () => localizeQuestions(questions, locale),
    [locale]
  )
  const t = getUIStrings(locale)

  const currentQuestion = localizedQuestions[currentStep]
  const isLastStep = currentStep === localizedQuestions.length - 1
  const canGoNext = !!answers[currentQuestion.id]

  useEffect(() => {
    setAnswers((prev) => ({
      ...prev,
      reading_language: locale,
    }))
  }, [locale])

  function handleSelect(value: string) {
    if (currentQuestion.id === "reading_language" && isLocale(value)) {
      onLocaleChange(value)
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  function handleNext() {
    if (isLastStep && canGoNext) {
      onComplete(answers)
    } else if (canGoNext) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <ProgressBar current={currentStep} total={localizedQuestions.length} locale={locale} />

      <div
        key={currentQuestion.id}
        className="animate-in fade-in slide-in-from-right-4 duration-500"
      >
        <QuestionStep
          question={currentQuestion}
          selectedValue={answers[currentQuestion.id]}
          onSelect={handleSelect}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {t.previous}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          {isLastStep ? t.revealReading : t.continue}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
