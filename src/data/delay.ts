/**
 * Simulates network latency so loading skeletons are actually observable.
 * Disable with NEXT_PUBLIC_DISABLE_MOCK_DELAY=1 (e.g. for quick QA passes).
 */
export async function mockDelay(): Promise<void> {
  if (process.env.NEXT_PUBLIC_DISABLE_MOCK_DELAY === "1") return
  const ms = 300 + Math.random() * 300
  await new Promise((resolve) => setTimeout(resolve, ms))
}
