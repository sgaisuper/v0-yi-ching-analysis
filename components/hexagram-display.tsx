"use client"

import { cn } from "@/lib/utils"

interface HexagramDisplayProps {
  lines: number[]
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

export function HexagramDisplay({
  lines,
  size = "md",
  animated = false,
  className,
}: HexagramDisplayProps) {
  const dimensions = {
    sm: { width: 80, height: 100, lineHeight: 6, gap: 10 },
    md: { width: 120, height: 160, lineHeight: 8, gap: 16 },
    lg: { width: 180, height: 240, lineHeight: 12, gap: 24 },
  }

  const d = dimensions[size]
  const startY = (d.height - (6 * d.lineHeight + 5 * d.gap)) / 2

  // Display from top (line 6) to bottom (line 1) — traditional I Ching order
  const displayLines = [...lines].reverse()

  return (
    <svg
      viewBox={`0 0 ${d.width} ${d.height}`}
      className={cn("text-primary", className)}
      role="img"
      aria-label="I Ching Hexagram"
    >
      {displayLines.map((line, index) => {
        const y = startY + index * (d.lineHeight + d.gap)
        const animDelay = animated ? `${index * 0.15}s` : "0s"

        if (line === 1) {
          // Yang — solid line
          return (
            <rect
              key={index}
              x={d.width * 0.1}
              y={y}
              width={d.width * 0.8}
              height={d.lineHeight}
              rx={d.lineHeight / 4}
              fill="currentColor"
              className={animated ? "animate-in fade-in slide-in-from-left-2" : ""}
              style={{ animationDelay: animDelay, animationFillMode: "backwards" }}
            />
          )
        } else {
          // Yin — broken line
          const segmentWidth = d.width * 0.35
          return (
            <g key={index}>
              <rect
                x={d.width * 0.1}
                y={y}
                width={segmentWidth}
                height={d.lineHeight}
                rx={d.lineHeight / 4}
                fill="currentColor"
                className={animated ? "animate-in fade-in slide-in-from-left-2" : ""}
                style={{ animationDelay: animDelay, animationFillMode: "backwards" }}
              />
              <rect
                x={d.width * 0.55}
                y={y}
                width={segmentWidth}
                height={d.lineHeight}
                rx={d.lineHeight / 4}
                fill="currentColor"
                className={animated ? "animate-in fade-in slide-in-from-right-2" : ""}
                style={{ animationDelay: animDelay, animationFillMode: "backwards" }}
              />
            </g>
          )
        }
      })}
    </svg>
  )
}
