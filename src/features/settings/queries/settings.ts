"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Setting } from "@/src/payload-types";

// PUBLIC API

/**
 * Get application settings (contact info, socials, analytics)
 */
export async function getSettings(): Promise<Setting> {
    const payload = await getPayload({ config: configPromise });

    const settings = await payload.findGlobal({
        slug: "settings",
    });

    return settings;
}
