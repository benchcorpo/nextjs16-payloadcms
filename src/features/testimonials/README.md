# Testimonials

## Overview

The Testimonials feature manages client reviews and feedback.

## Types

- **`Testimonial`**: Client testimonial with quote, client name, company, rating, photo, and date.

## Queries (Read Operations)

### `getTestimonials(options?): Promise<PaginatedDocs<Testimonial>>`

Get all testimonials with pagination.

- **Parameters**:
  - `options`: `{ limit?: number; page?: number; sort?: string; }`
  - `sort`: Sort order (default: `"-date"`)
- **Returns**: `Promise<PaginatedDocs<Testimonial>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

## UI Components to Create

### Pages / Sections

**View**: Testimonials List

- **Purpose**: List all testimonials
- **Placement**: Dedicated page OR section on Home/About page.
- **Data Source**: `getTestimonials()`

## Data Display Guidelines

### Testimonial (`Testimonial`)

- **`quote`** (textarea): The review text.
- **`client`** (string): Client name.
- **`company`** (string): Company name (optional).
- **`rating`** (number): Rating 1-5 (optional).
- **`photo`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`date`** (date): Date of testimonial.
