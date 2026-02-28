"use client"

import { useState, useEffect, useRef } from "react"
import { type Hexagram } from "@/lib/iching-data"
import { HexagramDisplay } from "@/components/hexagram-display"
import { Button } from "@/components/ui/button"
import { RotateCcw, Loader2, Share2, FileDown } from "lucide-react"
import { getUIStrings, localizeTrigram, type Locale } from "@/lib/i18n"

interface ReadingResultProps {
  hexagram: Hexagram
  answers: Record<string, string>
  onRestart: () => void
  locale: Locale
}

export function ReadingResult({ hexagram, answers, onRestart, locale }: ReadingResultProps) {
  const [aiReading, setAiReading] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [translatedText, setTranslatedText] = useState<{
    meaning: string
    judgment: string
    image: string
  } | null>(null)
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)
  const [exportFeedback, setExportFeedback] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const hasStartedRef = useRef(false)
  const t = getUIStrings(locale)
  const displayUpperTrigram = localizeTrigram(hexagram.trigrams.upper, locale)
  const displayLowerTrigram = localizeTrigram(hexagram.trigrams.lower, locale)
  const displayHexagramTitle =
    locale === "english"
      ? `${hexagram.name} (${hexagram.chineseName})`
      : `第${hexagram.number}卦 ${hexagram.chineseName}`

  useEffect(() => {
    let isCancelled = false

    async function fetchHexagramTranslation() {
      if (locale === "english") {
        setTranslatedText(null)
        return
      }

      try {
        const response = await fetch("/api/hexagram-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hexagram, locale }),
        })

        if (!response.ok) {
          throw new Error("Failed to translate hexagram text")
        }

        const data = (await response.json()) as {
          meaning?: string
          judgment?: string
          image?: string
        }

        if (isCancelled) return
        setTranslatedText({
          meaning: data.meaning || hexagram.meaning,
          judgment: data.judgment || hexagram.judgment,
          image: data.image || hexagram.image,
        })
      } catch {
        if (isCancelled) return
        setTranslatedText(null)
      }
    }

    fetchHexagramTranslation()
    return () => {
      isCancelled = true
    }
  }, [hexagram, locale])

  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    async function fetchReading() {
      try {
        setIsLoading(true)
        setError(null)
        setAiReading("")

        const response = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hexagram, answers }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate reading")
        }

        const data = (await response.json()) as { reading?: string }
        setAiReading(data.reading || "")

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching reading:", err)
        setError(t.errorOracleUnavailable)
        setIsLoading(false)
      }
    }

    fetchReading()
  }, [hexagram, answers])

  async function handleShare() {
    if (typeof window === "undefined") return

    const shareText = [
      t.shareHeading,
      `${t.hexagram} ${hexagram.number}: ${displayHexagramTitle}`,
      aiReading || t.shareFallbackText,
    ].join("\n\n")

    const shareUrl = window.location.href
    setShareFeedback(null)
    setIsSharing(true)

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${t.shareTitlePrefix}: ${displayHexagramTitle}`,
          text: shareText,
          url: shareUrl,
        })
        setShareFeedback(t.sharedSuccess)
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
        setShareFeedback(t.copiedSuccess)
        return
      }

      setShareFeedback(t.shareUnsupported)
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return
      }
      setShareFeedback(t.shareFailed)
    } finally {
      setIsSharing(false)
    }
  }

  function escapeHtml(input: string) {
    return input
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
  }

  function handleExportPdf() {
    if (typeof window === "undefined") return

    setExportFeedback(null)
    setIsExporting(true)

    try {
      const popup = window.open("", "_blank", "width=900,height=1100")
      if (!popup) {
        setExportFeedback(t.exportPdfBlocked)
        return
      }

      const bodyText = escapeHtml(aiReading || "")
      const meaningText = escapeHtml(translatedText?.meaning || hexagram.meaning)
      const judgmentText = escapeHtml(translatedText?.judgment || hexagram.judgment)
      const imageText = escapeHtml(translatedText?.image || hexagram.image)
      const subtitle = escapeHtml(`${t.hexagram} ${hexagram.number}: ${displayHexagramTitle}`)
      const title = escapeHtml(t.shareHeading)

      popup.document.open()
      popup.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      @page { size: A4; margin: 18mm; }
      html, body { background: #ffffff; }
      body { font-family: Georgia, "Times New Roman", serif; color: #111827; line-height: 1.6; }
      h1 { font-size: 22px; margin: 0 0 4px; }
      h2 { font-size: 15px; margin: 0 0 20px; color: #374151; font-weight: 500; }
      h3 { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; margin: 18px 0 6px; color: #6b7280; }
      p { white-space: pre-wrap; margin: 0 0 10px; }
      .divider { height: 1px; background: #e5e7eb; margin: 16px 0; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <div class="divider"></div>
    <h3>${escapeHtml(t.meaning)}</h3>
    <p>${meaningText}</p>
    <h3>${escapeHtml(t.judgment)}</h3>
    <p>${judgmentText}</p>
    <h3>${escapeHtml(t.image)}</h3>
    <p>${imageText}</p>
    <div class="divider"></div>
    <h3>${escapeHtml(t.personalReading)}</h3>
    <p>${bodyText}</p>
  </body>
</html>`)
      popup.document.close()
      popup.focus()

      const doPrint = () => {
        popup.focus()
        popup.print()
      }

      if (popup.document.readyState === "complete") {
        setTimeout(doPrint, 150)
      } else {
        popup.onload = () => {
          setTimeout(doPrint, 150)
        }
      }

      setExportFeedback(t.exportPdfSuccess)
    } catch {
      setExportFeedback(t.exportPdfFailed)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-sans">
          {t.yourHexagram}
        </span>

        <HexagramDisplay lines={hexagram.lines} size="lg" animated />

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground">
            {hexagram.chineseName}
          </h1>
          <h2 className="text-xl md:text-2xl font-serif text-primary">
            {locale === "english" ? hexagram.name : `${t.hexagram} ${hexagram.number}`}
          </h2>
          <p className="text-sm text-muted-foreground font-sans">
            {t.hexagram} {hexagram.number} &middot; {displayUpperTrigram} {t.trigramOver}{" "}
            {displayLowerTrigram}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-primary text-lg font-serif">&#9702;</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Traditional Texts */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
            {t.meaning}
          </h3>
          <p className="text-base text-foreground/90 font-serif leading-relaxed italic">
            {translatedText?.meaning || hexagram.meaning}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
            {t.judgment}
          </h3>
          <p className="text-base text-foreground/90 font-serif leading-relaxed">
            {translatedText?.judgment || hexagram.judgment}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
            {t.image}
          </h3>
          <p className="text-base text-foreground/90 font-serif leading-relaxed">
            {translatedText?.image || hexagram.image}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-primary text-lg font-serif">&#9702;</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* AI Interpretation */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
          {t.personalReading}
        </h3>

        {error ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-5 py-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card px-6 py-5">
            {aiReading ? (
              <div className="prose prose-invert prose-sm max-w-none font-serif leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {aiReading}
              </div>
            ) : isLoading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-sans">
                  {t.loadingReading}
                </span>
              </div>
            ) : null}
            {isLoading && aiReading && (
              <span className="inline-block h-4 w-0.5 bg-primary animate-pulse ml-0.5" />
            )}
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={handleShare}
            disabled={isSharing || isLoading || !!error}
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/60"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {isSharing ? t.sharing : t.shareReading}
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPdf}
            disabled={isExporting || isLoading || !!error}
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/60"
          >
            <FileDown className="mr-2 h-4 w-4" />
            {isExporting ? t.exportingPdf : t.exportPdf}
          </Button>

          <Button
            variant="outline"
            onClick={onRestart}
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/60"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t.consultAgain}
          </Button>
        </div>

        {shareFeedback && (
          <p className="text-xs text-muted-foreground font-sans">{shareFeedback}</p>
        )}
        {exportFeedback && (
          <p className="text-xs text-muted-foreground font-sans">{exportFeedback}</p>
        )}
      </div>
    </div>
  )
}
