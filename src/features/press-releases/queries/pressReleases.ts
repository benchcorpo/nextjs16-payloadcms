"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type PressRelease = {
    id: string;
    title: string;
    slug: string;
    /** Name of the publication/journal */
    journal?: string;
    /** Rich text excerpt (HTML) */
    excerpt?: string;
    /** URL to the full article */
    link?: string;
    /** ISO date string */
    publishedDate: string;
};

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

    return docs as unknown as PressRelease[];
}

/**
 * Get a single press release by slug
 */
export async function getPressReleaseBySlug(slug: string): Promise<PressRelease | null> {
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

    return docs[0] ? (docs[0] as unknown as PressRelease) : null;
}
