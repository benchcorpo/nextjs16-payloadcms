"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { OpeningHour } from "@/src/payload-types";

// PUBLIC API

/**
 * Get opening hours for all days of the week
 */
export async function getOpeningHours(): Promise<OpeningHour> {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.findGlobal({
    slug: "opening-hours",
  });

  return data;
}
