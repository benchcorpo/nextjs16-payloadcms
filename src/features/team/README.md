# Team

## Overview

The Team feature manages groups of team members (e.g., "Management", "Kitchen Staff"). It allows displaying team members organized by these groups.

## Types

- **`Team`**: A team group with name, slug, order, and a list of members.
- **`TeamMember`**: Individual team member with name, role, photo, bio, and social links.

## Queries (Read Operations)

### `getTeamSections(): Promise<Team[]>`

Get all team groups, including their members.

- **Returns**: `Promise<Team[]>` - Array of Team objects (groups)

### `getTeamSection(slug: string): Promise<Team | null>`

Get a single team group by its slug.

- **Use Case**: Display a specific team group (e.g., "Leadership") on a specific page (e.g., Home page) without showing the whole team.
- **Parameters**:
  - `slug`: The unique slug of the team group
- **Returns**: `Promise<Team | null>` - Team object or null

## UI Components to Create

### Pages / Sections

**View**: Team List

- **Purpose**: Display all team members, organized by group
- **Placement**: Dedicated page OR section on About page.
- **Data Source**: `getTeamSections()`

**View**: Specific Team Section

- **Purpose**: Display members of a single group
- **Placement**: Any relevant page.
- **Data Source**: `getTeamSection(slug)`

## Data Display Guidelines

### Team Group (`Team`)

- **`name`** (string): Group title.
- **`items`** (array): List of members.
- **`order`** (number): Sort order.
- **`slug`** (string): URL slug.

### Team Member (`TeamMember`)

- **`name`** (string): Member's full name.
- **`role`** (string): Job title.
- **`photo`** (upload/Media): **CRITICAL**. MUST be displayed using Next.js `<Image>`. Check for existence and use `url`.
- **`bio`** (textarea): Short biography (optional).
- **`email`** (email): Contact email (optional).
- **`phone`** (text): Contact phone (optional).
- **`linkedin`** (text): LinkedIn URL (optional).
- **`twitter`** (text): Twitter URL (optional).
- **`facebook`** (text): Facebook URL (optional).
- **`instagram`** (text): Instagram URL (optional).
