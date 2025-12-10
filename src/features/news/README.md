# News

## Overview

The News feature manages company news and announcements. It allows displaying a feed of news items with titles, content, images, and publication dates.

## Types

- **`NewsItem`**: News item with title, content, image, and published date.

## Queries (Read Operations)

### `getNews(options?): Promise<PaginatedDocs<NewsItem>>`

Get all news items with pagination.

- **Parameters**:
  - `options`: `{ limit?: number; page?: number; sort?: string; }`
  - `sort`: Sort order (default: `"-publishedDate"`)
- **Returns**: `Promise<PaginatedDocs<NewsItem>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

### `getNewsItem(slug: string): Promise<NewsItem | null>`

Get a single news item by slug.

- **Parameters**: `slug` (string)
- **Returns**: `Promise<NewsItem | null>`

## UI Components to Create

### Pages / Sections

**View**: News List

- **Purpose**: List recent news items
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getNews()`

**View**: News Detail

- **Purpose**: Display full news item
- **Placement**: Dedicated page.
- **Data Source**: `getNewsItem(slug)`

## Data Display Guidelines

### News Item (`NewsItem`)

- **`title`** (string): News headline.
- **`content`** (richText): Full news content.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`publishedDate`** (date): Publication date.
- **`slug`** (string): URL slug.
