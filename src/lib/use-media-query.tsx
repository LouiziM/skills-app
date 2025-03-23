"use client"

import { useState, useEffect } from "react"

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const handleChange = () => {
      setMatches(mediaQuery.matches)
    }

    // Initial check
    handleChange()

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)

    // Remove listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

