# Contact

## Overview

The Contact feature manages the business's contact information, social media links, and contact form submissions. It serves as the central source for all contact-related data.

## Types

- **`Contact`**: Global contact information (email, phone, address).

## Queries (Read Operations)

### `getContact(): Promise<Contact>`

Get the global contact information and social media links.

- **Returns**: `Promise<Contact>` - Object containing contact info and socials

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

- **Email Configuration**: Contact form submissions are sent to the email configured in the Contact global (`email` field). This field must be set in the admin panel for contact form submissions to work.

- **Returns**: Server Action compatible with `useActionState`
  - Returns `ContactFormState` (discriminated union):
    - Success: `{ success: true; id: string | number }`
    - Error: `{ success: false; error: string; fieldErrors?: Record<string, string[]> }`
    - Initial: `{}`

## UI Components to Create

### Pages / Sections

**View**: Contact Page

- **Purpose**: Display contact information and a contact form
- **Placement**: Dedicated page.
- **Data Source**:
  - `getContact()` (for contact info)
  - `createContactFormAction` mutation (for form submission)

## Data Display Guidelines

### Contact Info (`Contact`)

- **`email`** (email): Contact email.
- **`phone`** (text): Contact phone.
- **`address`** (textarea): Physical address.
