"use client"

import { useState, useRef, useCallback } from "react"
import { HeroSection } from "@/components/hero-section"
import { Questionnaire } from "@/components/questionnaire"
import { ReadingResult } from "@/components/reading-result"
import { generateHexagramFromAnswers, type Hexagram } from "@/lib/iching-data"
import {
  defaultLocale,
  getUIStrings,
  type Locale,
} from "@/lib/i18n"

type AppState = "hero" | "questionnaire" | "reading"

export default function Home() {
  const [state, setState] = useState<AppState>("hero")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [hexagram, setHexagram] = useState<Hexagram | null>(null)
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const questionnaireRef = useRef<HTMLDivElement>(null)
  const t = getUIStrings(locale)

  const handleBegin = useCallback(() => {
    setState("questionnaire")
    // Small delay for DOM to render before scrolling
    setTimeout(() => {
      questionnaireRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [])

  function handleLocaleChange(nextLocale: Locale) {
    setLocale(nextLocale)
  }

  function handleComplete(newAnswers: Record<string, string>) {
    setAnswers(newAnswers)
    const result = generateHexagramFromAnswers(newAnswers)
    setHexagram(result)
    setState("reading")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleRestart() {
    setAnswers({})
    setHexagram(null)
    setState("hero")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background">
      {state === "hero" && (
        <HeroSection
          onBegin={handleBegin}
          locale={locale}
          onLocaleChange={handleLocaleChange}
        />
      )}

      {state === "questionnaire" && (
        <div className="flex min-h-screen flex-col">
          {/* Header bar */}
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
              <span className="text-lg font-serif text-foreground">
                {t.appTitle}
              </span>
              <button
                onClick={handleRestart}
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors font-sans"
              >
                {t.startOver}
              </button>
            </div>
          </header>

          {/* Questionnaire */}
          <div
            ref={questionnaireRef}
            className="mx-auto w-full max-w-2xl flex-1 px-6 py-10"
          >
            <Questionnaire
              onComplete={handleComplete}
              locale={locale}
            />
          </div>
        </div>
      )}

      {state === "reading" && hexagram && (
        <div className="flex min-h-screen flex-col">
          {/* Header bar */}
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
              <span className="text-lg font-serif text-foreground">
                {t.appTitle}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans">
                {t.yourReading}
              </span>
            </div>
          </header>

          {/* Reading */}
          <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
            <ReadingResult
              key={`${hexagram.number}-${locale}`}
              hexagram={hexagram}
              answers={{ ...answers, reading_language: locale }}
              onRestart={handleRestart}
              locale={locale}
            />
          </div>

          {/* Footer */}
          <footer className="border-t border-border py-8">
            <div className="mx-auto max-w-2xl px-6 text-center">
              <p className="text-xs text-muted-foreground font-sans">
                {t.footerNote}
              </p>
            </div>
          </footer>
        </div>
      )}
    </main>
  )
}
