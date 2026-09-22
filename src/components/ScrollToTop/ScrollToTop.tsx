import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Restores the viewport to the top whenever the active route changes.
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])

  return null
}

export default ScrollToTop
