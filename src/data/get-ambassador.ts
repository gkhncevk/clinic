import "server-only"
import type { AmbassadorData } from "@/types/ambassador"
import { mockDelay } from "./delay"
import raw from "./ambassador.json"

export async function getAmbassadorData(): Promise<AmbassadorData> {
  await mockDelay()
  return raw as AmbassadorData
}
