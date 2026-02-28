"use client"

import { useState, useEffect, useRef } from "react"
import { type Hexagram } from "@/lib/iching-data"
import { HexagramDisplay } from "@/components/hexagram-display"
import { Button } from "@/components/ui/button"
import { RotateCcw, Loader2, Share2 } from "lucide-react"

interface ReadingResultProps {
  hexagram: Hexagram
  answers: Record<string, string>
  onRestart: () => void
}

export function ReadingResult({ hexagram, answers, onRestart }: ReadingResultProps) {
  const [aiReading, setAiReading] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    async function fetchReading() {
      try {
        const response = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hexagram, answers }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate reading")
        }

        if (!response.body) {
          throw new Error("No response body")
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          // Parse SSE format
          const lines = chunk.split("\n")
          for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed.startsWith("data:")) {
              const data = trimmed.slice(5).trim()
              if (data === "[DONE]") continue
              try {
                const parsed = JSON.parse(data)
                if (parsed.type === "text-delta" && parsed.textDelta) {
                  fullText += parsed.textDelta
                  setAiReading(fullText)
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching reading:", err)
        setError("The oracle is momentarily unavailable. Please try again.")
        setIsLoading(false)
      }
    }

    fetchReading()
  }, [hexagram, answers])

  async function handleShare() {
    if (typeof window === "undefined") return

    const shareText = [
      `Yi Ching Oracle Reading`,
      `Hexagram ${hexagram.number}: ${hexagram.name} (${hexagram.chineseName})`,
      aiReading || "I received an I Ching reading and wanted to share it with you.",
    ].join("\n\n")

    const shareUrl = window.location.href
    setShareFeedback(null)
    setIsSharing(true)

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Yi Ching Reading: ${hexagram.name}`,
          text: shareText,
          url: shareUrl,
        })
        setShareFeedback("Reading shared.")
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
        setShareFeedback("Reading copied to clipboard.")
        return
      }

      setShareFeedback("Sharing is not supported on this device.")
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return
      }
      setShareFeedback("Unable to share right now. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-sans">
          Your Hexagram
        </span>

        <HexagramDisplay lines={hexagram.lines} size="lg" animated />

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground">
            {hexagram.chineseName}
          </h1>
          <h2 className="text-xl md:text-2xl font-serif text-primary">
            {hexagram.name}
          </h2>
          <p className="text-sm text-muted-foreground font-sans">
            Hexagram {hexagram.number} &middot; {hexagram.trigrams.upper} over{" "}
            {hexagram.trigrams.lower}
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
            Meaning
          </h3>
          <p className="text-base text-foreground/90 font-serif leading-relaxed italic">
            {hexagram.meaning}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
            The Judgment
          </h3>
          <p className="text-base text-foreground/90 font-serif leading-relaxed">
            {hexagram.judgment}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
            The Image
          </h3>
          <p className="text-base text-foreground/90 font-serif leading-relaxed">
            {hexagram.image}
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
          Your Personal Reading
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
                  The oracle is contemplating your situation...
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
            {isSharing ? "Sharing..." : "Share Reading"}
          </Button>

          <Button
            variant="outline"
            onClick={onRestart}
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/60"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Consult the Oracle Again
          </Button>
        </div>

        {shareFeedback && (
          <p className="text-xs text-muted-foreground font-sans">{shareFeedback}</p>
        )}
      </div>
    </div>
  )
}
