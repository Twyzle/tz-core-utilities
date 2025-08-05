/**
 * Polls an input element by ID to detect autofilled value and triggers a callback.
 */
export function detectAutoFilledValue(
  inputId: string,
  callback: (value: string) => void,
  options: { timeoutMs?: number; intervalMs?: number } = {},
) {
  if (typeof window === 'undefined') return
  const { timeoutMs = 3000, intervalMs = 200 } = options
  const startTime = Date.now()

  const interval = setInterval(() => {
    const input = document.getElementById(inputId) as HTMLInputElement | null
    if (input && input.value) {
      callback(input.value)
      clearInterval(interval)
    } else if (Date.now() - startTime > timeoutMs) {
      clearInterval(interval)
    }
  }, intervalMs)
}
