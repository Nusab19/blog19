'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlitchingNumberProps {
  size?: number
  number?: string
  fadeIn?: number
  className?: string
}

export default function GlitchingNumber({
  size = 20,
  number = '19',
  fadeIn,
  className,
}: GlitchingNumberProps) {
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const [opacity, setOpacity] = useState(fadeIn ? 0 : 1)

  // Handle fade-in effect
  useEffect(() => {
    if (fadeIn) {
      const timer = setTimeout(() => {
        setOpacity(1)
      }, 10)

      return () => clearTimeout(timer)
    }
  }, [fadeIn])

  useEffect(() => {
    const intensityInterval = setInterval(() => {
      setGlitchIntensity(Math.random() > 0.7 ? Math.random() * 0.8 + 0.2 : 0)
    }, 200)

    return () => clearInterval(intensityInterval)
  }, [])

  const scaleFactor = size / 20
  const translateX = (value: number) => value * scaleFactor
  const fontSize = `${size}rem`

  return (
    <div
      className={cn(
        'relative flex max-w-fit rotate-0 items-center justify-center group-hover:rotate-[19deg]',
        className,
      )}
      style={{
        opacity,
        transition: fadeIn
          ? `opacity ${fadeIn}ms ease-in-out, transform 150ms ease-out`
          : '',
      }}
    >
      {/* Base number */}
      <div
        className="bg-gradient-to-r from-sky-500 from-60% to-purple-400 bg-clip-text font-bold leading-none tracking-tighter text-transparent"
        style={{ fontSize }}
      >
        {number}
      </div>

      {/* Glitch layers */}
      <div
        className="absolute inset-0 font-bold leading-none tracking-tighter text-cyan-500 mix-blend-screen"
        style={{
          fontSize,
          clipPath: `polygon(0 ${10 * glitchIntensity}%, 100% ${5 * glitchIntensity}%, 100% ${80 + 10 * glitchIntensity}%, 0 ${90 + 5 * glitchIntensity}%)`,
          transform: `translate(${translateX(glitchIntensity * 10)}px, ${translateX(glitchIntensity * -5)}px)`,
          opacity: glitchIntensity > 0.3 ? 0.8 : 0,
        }}
      >
        {number}
      </div>

      <div
        className="absolute inset-0 font-bold leading-none tracking-tighter text-red-500 mix-blend-screen"
        style={{
          fontSize,
          clipPath: `polygon(0 ${20 * glitchIntensity}%, 100% ${25 * glitchIntensity}%, 100% ${45 + 10 * glitchIntensity}%, 0 ${50 + 15 * glitchIntensity}%)`,
          transform: `translate(${translateX(glitchIntensity * -10)}px, ${translateX(glitchIntensity * 5)}px)`,
          opacity: glitchIntensity > 0.3 ? 0.8 : 0,
        }}
      >
        {number}
      </div>

      {/* Scanlines */}
      <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-20"></div>

      {/* Random glitch blocks */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/80 mix-blend-overlay"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${translateX(Math.random() * 20 + 5)}px`,
            height: `${translateX(Math.random() * 5 + 2)}px`,
            opacity: glitchIntensity > 0.5 ? Math.random() : 0,
            transform: `translateX(${translateX((Math.random() - 0.5) * 50)}px)`,
          }}
        />
      ))}
    </div>
  )
}
