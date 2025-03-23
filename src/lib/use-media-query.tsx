import { useState, useEffect } from "react"

/**
 * Custom hook to track media query changes
 * @param {string} query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns {boolean} - Whether the query matches or not
 */
export function useMediaQuery(query:string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event) => setMatches(event.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}
