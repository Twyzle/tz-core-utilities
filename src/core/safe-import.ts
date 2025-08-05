/**
 * Dynamically imports a module, returning an empty default on failure.
 */
export async function safeImport(path: string) {
  try {
    return await import(
      /* @vite-ignore */
      path
      )
  } catch {
    return { default: {} }
  }
}