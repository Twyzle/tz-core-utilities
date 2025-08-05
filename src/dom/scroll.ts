/**
 * Smoothly scrolls to an element by ID.
 */
export function scrollToElementById(id: string, offset?: number): void {
  if (typeof window === 'undefined') return
  const elem = document.getElementById(id)
  if (elem) {
    if (offset) {
      const elemPos = elem.getBoundingClientRect().top
      const offsetPos = window.scrollY + elemPos + offset
      window.scrollTo({ top: offsetPos, behavior: 'smooth' })
    } else {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
