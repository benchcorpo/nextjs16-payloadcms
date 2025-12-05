# Feature Documentation Guidelines

This directory contains the feature-based architecture of the application. Each feature folder (e.g., `blog`, `events`) MUST contain a `README.md` file.

This `README.md` serves as the **primary instruction manual for the Skeleton Agent** (and human developers) to build the frontend UI.

## README Structure

Every feature `README.md` must follow this exact structure:

### 1. Overview

Brief description of what the feature does.

### 2. Types

List all TypeScript types exported from `types.ts`.

- **Format**: `TypeName` - Brief description
- This section documents the custom types available for the frontend agent to import.

### 3. Queries (Read Operations)

_Only if applicable._
List all public query functions exported from `queries/*.ts`.

- **Format**: `functionName(params): ReturnType`
- **Description**: What it fetches.
- **Slug Queries**: Explicitly mention if a query by slug (e.g., `getCategory(slug)`) allows displaying a specific group/item on _any_ page (flexible placement).

### 4. Mutations (Write Operations)

_Only if applicable._

- List public mutation functions.
- **Validation**: Explicitly reference the Zod schema from `mutations/schema.ts`.
- **Instruction**: Tell the agent to use this schema for client-side validation.

### 5. UI Components to Create

List the views the agent should build.

- **Terminology**: Use **"View"** instead of "Page" to imply flexibility.
- **Placement**: Explicitly state "Dedicated page OR section on Home/About page" where appropriate.
- **Do NOT include**:
  - Layout instructions (let agent decide)
  - Component Structure/Must Include sections (let agent decide)
  - Specific component naming

### 6. Data Display Guidelines

List the key data types and their fields.

- **Images**: **CRITICAL**. You MUST use this exact instruction for image fields:
  > **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **Icons**: Do NOT instruct to use specific icons or emojis. The agent is authorized to use `lucide-react` at its discretion.
- **Do NOT include**:
  - Formatting instructions (e.g., "Display as stars", "Format as currency")
  - Display instructions (e.g., "Display as mailto: link")

## Example Template

```markdown
# Feature Name

## Overview

Description...

## Types

- **`Item`**: Item with name and image.

## Queries

### `getItems(): Promise<Item[]>`

Get all items.

### `getItem(slug: string): Promise<Item | null>`

Get single item.

## UI Components to Create

### Pages / Sections

**View**: Items List

- **Purpose**: List all items
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getItems()`

## Data Display Guidelines

### Item (`Item`)

- **`name`** (string): Name.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
```
