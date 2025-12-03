# Contact Emails

## Overview

The Contact Emails feature allows website visitors to send messages through a contact form. Messages are stored in the database and sent via email to the site administrator.

## Mutations (Write Operations)

### `createContactFormAction(generateEmailHtml): ServerAction`

Creates a Server Action for contact form submissions compatible with `useActionState`.

- **Parameters**: 
  - `generateEmailHtml: (data: ContactFormData) => string` - Function that generates the HTML email template from validated form data
    - `data.name: string` - Sender's name
    - `data.email: string` - Sender's email
    - `data.phone?: string` - Sender's phone (optional)
    - `data.subject: string` - Message subject
    - `data.message: string` - Message content

- **Validation Schema**: `contactFormSchema` from `mutations/schema.ts`
  - Use this schema for frontend form validation
  - The schema is exported and can be imported in client components

- **Returns**: Server Action compatible with `useActionState`
  - Returns `ContactFormState` (discriminated union):
    - Success: `{ success: true; id: string | number }`
    - Error: `{ success: false; error: string; fieldErrors?: Record<string, string[]> }`
    - Initial: `{}`

- **Example**:
```tsx
// 1. Create server action (app/(frontend)/contact/actions.ts)
"use server";
import { createContactFormAction } from "@/src/features/contact-emails/mutations/contact";

export const submitContact = createContactFormAction((data) => `
    <h2>New Contact from ${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br/>')}</p>
`);

// 2. Use in form component (app/(frontend)/contact/ContactForm.tsx)
"use client";
import { useActionState } from "react";
import { submitContact } from "./actions";
import { contactFormSchema } from "@/src/features/contact-emails/mutations/schema";

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContact, {});

    return (
        <form action={formAction}>
            <input name="name" required />
            {state.success === false && state.fieldErrors?.name && (
                <p>{state.fieldErrors.name[0]}</p>
            )}
            
            <input name="email" type="email" required />
            {state.success === false && state.fieldErrors?.email && (
                <p>{state.fieldErrors.email[0]}</p>
            )}
            
            <input name="phone" />
            
            <input name="subject" required />
            {state.success === false && state.fieldErrors?.subject && (
                <p>{state.fieldErrors.subject[0]}</p>
            )}
            
            <textarea name="message" required />
            {state.success === false && state.fieldErrors?.message && (
                <p>{state.fieldErrors.message[0]}</p>
            )}
            
            <button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send Message"}
            </button>
            
            {state.success === false && state.error && <p>{state.error}</p>}
            {state.success === true && <p>Message sent successfully!</p>}
        </form>
    );
}
```

## UI Components to Create

### Pages / Sections

**View**: Contact Page
- **Purpose**: Display contact information and a contact form
- **Placement**: Dedicated page.
- **Data Source**: 
  - Settings global (for contact info, address, phone, email)
  - `createContactFormAction` mutation (for form submission)
- **Layout**: Two-column layout (contact info + form)
- **Special Notes**: This is typically the only page needed for this feature

### Components

**Component**: `ContactForm`
- **Purpose**: Contact form with validation and submission handling
- **Props**: None (can optionally accept settings for pre-filling)
- **Must Include**:
  - Name field (text input)
  - Email field (email input)
  - Phone field (optional text input)
  - Subject field (text input)
  - Message field (textarea)
  - Submit button
  - Loading state during submission (via `isPending`)
  - Success message after submission
  - Error display for validation failures
- **Special Notes**: 
  - Must use `"use client"` directive (form interactivity required)
  - Import and use `contactFormSchema` for validation if needed
  - Create server action file with custom email template

## Data Display Guidelines

This feature is primarily for data submission. However, the `ContactEmail` type contains the following fields:

### Contact Email (`ContactEmail`)

- **`name`** (string): Sender's name.
- **`email`** (email): Sender's email.
- **`phone`** (text): Sender's phone.
- **`subject`** (text): Message subject.
- **`message`** (textarea): Message content.
- **`submittedAt`** (date): Submission timestamp.
- **`slug`** (string): Collection slug.

## Examples

See the mutation example above for complete form implementation.

### Email HTML Template Example

```tsx
const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Form Submission</h2>
        <div class="field">
            <span class="label">Name:</span> ${data.name}
        </div>
        <div class="field">
            <span class="label">Email:</span> ${data.email}
        </div>
        ${data.phone ? `<div class="field"><span class="label">Phone:</span> ${data.phone}</div>` : ''}
        <div class="field">
            <span class="label">Subject:</span> ${data.subject}
        </div>
        <div class="field">
            <span class="label">Message:</span><br/>
            ${data.message.replace(/\n/g, '<br/>')}
        </div>
    </div>
</body>
</html>
`;
```
