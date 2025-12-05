# Events

## Overview

The Events feature manages upcoming events, workshops, or gatherings. It allows listing events, showing details for a specific event, and handling event registration links.

## Types

- **`Event`**: Event with title, date, location, image, description, and registration links.

## Queries (Read Operations)

### `getUpcomingEvents(options?): Promise<Event[]>`

Get a list of upcoming events.

- **Parameters**:
  - `options`: `{ limit?: number; sort?: string; }`
  - `limit`: Maximum number of events to return (default: `10`)
  - `sort`: Sort order (default: `"date"`)
- **Returns**: `Promise<Event[]>` - Array of Event objects

### `getEvents(options?): Promise<PaginatedDocs<Event>>`

Get all events (past and future) with pagination support.

- **Parameters**:
  - `options`: `{ limit?: number; page?: number; sort?: string; }`
  - `sort`: Sort order (default: `"-date"`)
- **Returns**: `Promise<PaginatedDocs<Event>>` - Includes `docs`, `totalDocs`, `totalPages`, `page`, `hasNextPage`, `hasPrevPage`

### `getEvent(slug: string): Promise<Event | null>`

Get a single event by its slug.

- **Parameters**:
  - `slug`: The unique slug of the event
- **Returns**: `Promise<Event | null>` - Event object or null if not found

## UI Components to Create

### Pages / Sections

**View**: Events List

- **Purpose**: List all upcoming events
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getUpcomingEvents()` or `getEvents()`

**View**: Event Detail

- **Purpose**: Display full details of a specific event
- **Placement**: Dedicated page.
- **Data Source**: `getEvent(slug)`

## Data Display Guidelines

### Event (`Event`)

- **`title`** (string): Event title.
- **`date`** (string/date): Event start date.
- **`endDate`** (string/date): Event end date (optional).
- **`location`** (string): Event location.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`description`** (richText): Event description.
- **`registrationLink`** (string): Registration URL (optional).
- **`virtualLink`** (string): Virtual event URL (optional).
- **`slug`** (string): URL slug.
