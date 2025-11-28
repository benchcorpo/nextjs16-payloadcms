"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { PressRelease } from "@/src/payload-types";

// PUBLIC API

/**
 * Get all press releases
 */
export async function getPressReleases(limit = 20): Promise<PressRelease[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "press-releases",
        limit,
        sort: "-publishedDate",
        depth: 1,
    });

    return docs;
}

/**
 * Get a single press release by slug
 */
export async function getPressRelease(slug: string): Promise<PressRelease | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "press-releases",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 1,
    });

    return docs[0] || null;
}
