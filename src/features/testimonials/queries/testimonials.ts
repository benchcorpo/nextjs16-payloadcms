"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import type { Testimonial } from "@/src/payload-types";

// PUBLIC API

/**
 * Get all testimonials
 */
export async function getTestimonials(limit = 20): Promise<Testimonial[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "testimonials",
        limit,
        sort: "-date",
        depth: 1,
    });

    return docs;
}
