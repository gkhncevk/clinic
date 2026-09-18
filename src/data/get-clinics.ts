import "server-only"
import type { Clinic } from "@/types/clinic"
import { mockDelay } from "./delay"
import raw from "./clinics.json"

export async function getClinics(): Promise<Clinic[]> {
  await mockDelay()
  return raw as Clinic[]
}
