/**
 * News feature types
 */

import type { Media, RichText } from "@/src/core/types";

export interface NewsItem {
  id: number;
  title: string;
  content: RichText;
  featuredImage?: Media;
  publishedDate: string;
  slug: string;
}
