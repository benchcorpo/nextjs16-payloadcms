/**
 * Blog feature types
 */

import type { Media, RichText } from "@/src/core/types";

export interface BlogCategory {
  id: number;
  name: string;
  description?: string;
  image?: Media;
  slug: string;
  order: number;
}

export interface BlogAuthor {
  id: number;
  name: string;
  description?: string;
  photo?: Media;
  slug: string;
  order: number;
}

export interface BlogTag {
  tag: string;
  id?: string;
}

export interface BlogPost {
  id: number;
  category: BlogCategory;
  title: string;
  image?: Media;
  excerpt?: string;
  content: RichText;
  author: BlogAuthor;
  tags: BlogTag[];
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  publishedDate: string;
}
