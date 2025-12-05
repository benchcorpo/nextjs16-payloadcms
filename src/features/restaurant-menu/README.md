# Restaurant Menu

## Overview

The Restaurant Menu feature manages menu categories (e.g., "Starters", "Main Courses") and their dishes. It allows displaying the full menu organized by category.

## Types

- **`RestaurantMenu`**: Menu category with name, slug, order, and list of menu items.
- **`MenuItem`**: Individual dish with name, description, price, image, dietary info, and spicy level.
- **`SpicyLevel`**: Type alias for spicy level options ("none" | "mild" | "medium" | "hot" | "extra-hot").

## Queries (Read Operations)

### `getMenuSections(): Promise<RestaurantMenu[]>`

Get all menu categories, including their dishes.

- **Returns**: `Promise<RestaurantMenu[]>` - Array of RestaurantMenu objects (categories)

### `getMenuSection(slug: string): Promise<RestaurantMenu | null>`

Get a single menu category by its slug.

- **Use Case**: Display a specific category (e.g., "Beverages" or "Specials") on a specific page or section (e.g., Home page highlight).
- **Parameters**:
  - `slug`: The unique slug of the category
- **Returns**: `Promise<RestaurantMenu | null>` - RestaurantMenu object or null

## UI Components to Create

### Pages / Sections

**View**: Menu Page

- **Purpose**: Display the full restaurant menu
- **Placement**: Dedicated page OR section on Home page.
- **Data Source**: `getMenuSections()`

**View**: Specific Menu Section

- **Purpose**: Display dishes from a single category
- **Placement**: Any relevant page.
- **Data Source**: `getMenuSection(slug)`

## Data Display Guidelines

### Menu Category (`RestaurantMenu`)

- **`name`** (string): Category title.
- **`items`** (array): List of dishes.
- **`order`** (number): Sort order.
- **`slug`** (string): URL slug.

### Menu Item (`MenuItem`)

- **`name`** (string): Dish name.
- **`description`** (textarea): Dish description.
- **`price`** (number): Price.
- **`image`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`dietary`** (text): Dietary info (optional).
- **`spicyLevel`** (select): Spicy level (optional).
