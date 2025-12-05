# Opening Hours

## Overview

The Opening Hours feature manages the business operating hours for each day of the week. It is a global setting.

## Types

- **`OpeningHours`**: Weekly opening hours schedule with start date for scheduling.
- **`DaySchedule`**: Individual day schedule with open/close times and isOpen flag.

## Queries (Read Operations)

### `getOpeningHours(): Promise<OpeningHours | null>`

Get the currently active opening hours based on the current date. Returns the entry with the most recent `startDate` that is in the past or today.

## UI Components to Create

### Pages / Sections

**View**: Opening Hours Section

- **Purpose**: Display opening hours
- **Placement**: Section on Contact page, Footer, or Header.
- **Data Source**: `getOpeningHours()`

## Data Display Guidelines

### Opening Hours (`OpeningHours`)

- **`monday`**, **`tuesday`**, **`wednesday`**, **`thursday`**, **`friday`**, **`saturday`**, **`sunday`** (`DaySchedule`): Day schedules.

### Day Schedule (`DaySchedule`)

- **`isOpen`** (boolean): Whether open on this day.
- **`open`** (string): Opening time.
- **`close`** (string): Closing time.
