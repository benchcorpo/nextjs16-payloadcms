import { z } from "zod";

/**
 * Zod schema for contact email validation
 * Export this schema to use it in frontend forms for client-side validation
 */
export const contactEmailSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.email("Invalid email address"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
    message: z.string().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
    emailHtml: z.string().min(1, "Email HTML template is required"),
});

// TYPES
export type ContactEmailData = z.infer<typeof contactEmailSchema>;

export type ContactEmailResult = {
    success: boolean;
    id?: string | number;
    error?: string;
    validationErrors?: Record<string, string[]>;
};
