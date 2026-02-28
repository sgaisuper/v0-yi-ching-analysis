"use client"

import { HexagramDisplay } from "@/components/hexagram-display"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { getUIStrings, localeOptions, type Locale } from "@/lib/i18n"

interface HeroSectionProps {
  onBegin: () => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function HeroSection({ onBegin, locale, onLocaleChange }: HeroSectionProps) {
  const t = getUIStrings(locale)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      {/* Decorative background hexagrams */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="absolute -left-20 top-20 rotate-12">
          <HexagramDisplay lines={[1, 0, 1, 0, 1, 0]} size="lg" />
        </div>
        <div className="absolute -right-10 top-40 -rotate-6">
          <HexagramDisplay lines={[0, 1, 0, 1, 0, 1]} size="lg" />
        </div>
        <div className="absolute bottom-20 left-1/4 rotate-3">
          <HexagramDisplay lines={[1, 1, 0, 0, 1, 1]} size="lg" />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-10 text-center">
        <div className="absolute -top-14 right-0">
          <select
            value={locale}
            onChange={(event) => onLocaleChange(event.target.value as Locale)}
            aria-label="Language"
            className="rounded-md border border-border bg-background px-3 py-2 text-xs font-sans text-muted-foreground"
          >
            {localeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Symbol */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-px w-16 bg-primary/40" />
          <HexagramDisplay lines={[1, 0, 1, 1, 0, 1]} size="md" animated />
          <div className="h-px w-16 bg-primary/40" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.4em] text-primary font-sans">
            {t.heroEyebrow}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-tight text-balance">
            {t.appTitle}
          </h1>
          <p className="mx-auto max-w-lg text-base md:text-lg text-muted-foreground font-sans leading-relaxed">
            {t.heroDescription}
          </p>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          onClick={onBegin}
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-sans tracking-wide"
        >
          {t.beginReading}
        </Button>

        {/* Scroll indicator */}
        <div className="absolute -bottom-16 flex flex-col items-center gap-2 text-muted-foreground/50">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
