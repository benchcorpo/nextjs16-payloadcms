"use server";

import { z } from "zod";
import { getPayload } from "payload";
import configPromise from "@/src/payload.config";
import { contactEmailSchema, type ContactEmailData, type ContactEmailResult } from "./schema";

// PUBLIC API

/**
 * Submit a contact email
 * 
 * This function:
 * 1. Validates the input data using Zod schema
 * 2. Saves the contact submission to the database
 * 3. Sends an email notification with the provided HTML template
 * 
 * @param data Contact form data including custom emailHtml
 * @returns Success status and document ID, or validation errors
 */
export async function submitContactEmail(
    data: ContactEmailData
): Promise<ContactEmailResult> {
    try {
        // Validate input data
        const validationResult = contactEmailSchema.safeParse(data);

        if (!validationResult.success) {
            const { fieldErrors, formErrors } = z.flattenError(validationResult.error);

            return {
                success: false,
                error: formErrors.length > 0 ? formErrors.join(", ") : "Validation failed",
                validationErrors: fieldErrors,
            };
        }

        const validatedData = validationResult.data;
        const payload = await getPayload({ config: configPromise });

        // 1. Save to database
        const doc = await payload.create({
            collection: "contact-emails",
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                subject: validatedData.subject,
                message: validatedData.message,
            },
        });

        // 2. Send email with provided HTML
        await payload.sendEmail({
            to: process.env.CONTACT_EMAIL || "admin@example.com",
            subject: `New Contact: ${validatedData.subject}`,
            html: validatedData.emailHtml,
        });

        return { success: true, id: doc.id };
    } catch (error) {
        console.error("Failed to submit contact email:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
