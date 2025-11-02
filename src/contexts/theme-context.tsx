"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type AccentColor = "blue" | "purple" | "green" | "orange" | "pink" | "yellow" | "custom"

type ThemeContextType = {
  theme: Theme
  accentColor: AccentColor
  customColor: string
  isColorLight: (hex?: string) => boolean
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
  setCustomColor: (color: string) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Helper function to determine if a color is light or dark
function isColorLight(hex?: string): boolean {
  if (!hex) return true
  try {
    hex = hex.replace(/^#/, "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return brightness > 0.5
  } catch {
    return true
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [accentColor, setAccentColor] = useState<AccentColor>("blue")
  const [customColor, setCustomColor] = useState<string>("#3b82f6")

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme") as Theme | null
      const storedAccentColor = localStorage.getItem("accentColor") as AccentColor | null
      const storedCustomColor = localStorage.getItem("customColor") as string | null
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      if (storedTheme) {
        setTheme(storedTheme)
      } else if (prefersDark) {
        setTheme("dark")
      }

      if (storedAccentColor) {
        setAccentColor(storedAccentColor)
      }

      if (storedCustomColor && /^#[0-9A-Fa-f]{6}$/.test(storedCustomColor)) {
        setCustomColor(storedCustomColor)
      }
    } catch (error) {
      console.error("Error initializing theme from localStorage:", error)
    }
  }, [])

  // Update document class and localStorage when theme changes
  useEffect(() => {
    try {
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("theme", theme)
      localStorage.setItem("accentColor", accentColor)
      if (accentColor === "custom") {
        localStorage.setItem("customColor", customColor)
      }
    } catch (error) {
      console.error("Error updating theme:", error)
    }
  }, [theme, accentColor, customColor])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        customColor,
        isColorLight,
        setTheme,
        setAccentColor,
        setCustomColor,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
