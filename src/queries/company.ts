"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type CompanyInfo = {
    /** Company description/about text */
    description?: string;
    /** Contact information */
    contact?: {
        email?: string;
        phone?: string;
        /** Full address */
        address?: string;
    };
    /** Social media URLs */
    socials?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
    };
    /** Application settings */
    settings?: {
        /** Google Analytics Measurement ID */
        googleAnalyticsId?: string;
    };
};

// PUBLIC API

/**
 * Get company information (description, contact, socials, settings)
 */
export async function getCompanyInfo(): Promise<CompanyInfo> {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.findGlobal({
        slug: "company-info",
    });

    return data as unknown as CompanyInfo;
}
