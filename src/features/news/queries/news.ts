"use server";

import { getPayload } from "payload";
import type { PaginatedDocs } from "payload";
import configPromise from "@/src/payload.config";
import type { NewsItem } from "../types";

// PUBLIC API

/**
 * Get all news items with pagination
 */
export async function getNews(options?: {
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<PaginatedDocs<NewsItem>> {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "news",
    limit: options?.limit || 20,
    page: options?.page || 1,
    sort: options?.sort ?? "-publishedDate",
    depth: 1,
  });

  return result as PaginatedDocs<NewsItem>;
}

/**
 * Get a single news item by slug
 */
export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "news",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  });

  return (docs[0] as NewsItem) || null;
}
