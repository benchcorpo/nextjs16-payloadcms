# Press Releases

## Overview

The Press Releases feature manages company news and announcements.

## Types

- **`PressRelease`**: News/announcement with title, journal, excerpt, link, and published date.

## Queries (Read Operations)

### `getPressReleases(options?): Promise<PaginatedDocs<PressRelease>>`

Get all press releases with pagination.

- **Parameters**:
  - `options`: `{ limit?: number; page?: number; sort?: string; }`
  - `sort`: Sort order (default: `"-publishedDate"`)
- **Returns**: `Promise<PaginatedDocs<PressRelease>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

### `getPressRelease(slug: string): Promise<PressRelease | null>`

Get a single press release by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<PressRelease | null>`

## UI Components to Create

### Pages / Sections

**View**: Press List

- **Purpose**: List press releases
- **Placement**: Dedicated page OR section on Home/About page.
- **Data Source**: `getPressReleases()`

**View**: Press Detail

- **Purpose**: Display press release details
- **Placement**: Dedicated page.
- **Data Source**: `getPressRelease(slug)`

## Data Display Guidelines

### Press Release (`PressRelease`)

- **`title`** (string): Headline.
- **`journal`** (text): Publication name (optional).
- **`excerpt`** (richText): Short summary (optional).
- **`link`** (text): URL to original article (optional).
- **`publishedDate`** (date): Publication date.
- **`slug`** (string): URL slug.
