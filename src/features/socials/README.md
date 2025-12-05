# Socials

## Overview

The Socials feature manages the business's social media links. It provides a central location to configure URLs for Facebook, Instagram, LinkedIn, and Twitter.

## Types

- **`Socials`**: Global social media links configuration.

## Queries (Read Operations)

### `getSocials(): Promise<Socials>`

Get the global social media links.

- **Returns**: `Promise<Socials>` - Object containing social media URLs.

## UI Components to Create

### Pages / Sections

**View**: Social Links

- **Purpose**: Display social media links.
- **Placement**: Footer, Contact Page, or Header.
- **Data Source**: `getSocials()`

## Data Display Guidelines

### Social Media (`Socials`)

- **`facebook`** (text): Facebook URL (optional).
- **`instagram`** (text): Instagram URL (optional).
- **`linkedin`** (text): LinkedIn URL (optional).
- **`twitter`** (text): Twitter URL (optional).
