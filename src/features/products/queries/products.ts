"use server";

import { getPayload } from "payload";
import configPromise from "@/src/payload.config";

// TYPES

export type ProductItem = {
    id: string;
    name: string;
    slug: string;
    /** Rich text description (HTML) */
    description?: string;
    price?: number;
    gallery?: Array<{
        url: string;
        alt?: string;
    }>;
    /** Categories is required and can have multiple values */
    categories: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
    specifications?: Array<{
        name: string;
        value: string;
    }>;
    relatedProducts?: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
};

export type ProductCategory = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    parent?: {
        id: string;
        name: string;
        slug: string;
    };
    image?: {
        url: string;
        alt?: string;
    };
};

// PUBLIC API

/**
 * Get all product items with optional filtering and pagination
 */
export async function getProductItems(options?: {
    limit?: number;
    page?: number;
    category?: string;
}): Promise<ProductItem[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "product-items",
        limit: options?.limit || 10,
        page: options?.page || 1,
        where: options?.category
            ? {
                "categories.slug": {
                    equals: options.category,
                },
            }
            : undefined,
        sort: "order",
        depth: 2,
    });

    return docs as unknown as ProductItem[];
}

/**
 * Get a single product item by slug
 */
export async function getProductItem(slug: string): Promise<ProductItem | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "product-items",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    });

    return docs[0] ? (docs[0] as unknown as ProductItem) : null;
}

/**
 * Get all product categories (including nested ones)
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "product-categories",
        sort: "order",
        depth: 1,
    });

    return docs as unknown as ProductCategory[];
}

/**
 * Get root product categories (categories without parents)
 */
export async function getRootProductCategories(): Promise<ProductCategory[]> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "product-categories",
        where: {
            parent: {
                exists: false,
            },
        },
        sort: "order",
    });

    return docs as unknown as ProductCategory[];
}

/**
 * Get subcategories of a specific category
 */
export async function getSubCategories(parentSlug: string): Promise<ProductCategory[]> {
    const payload = await getPayload({ config: configPromise });

    // First, find the parent category
    const parent = await getProductCategory(parentSlug);
    if (!parent) return [];

    const { docs } = await payload.find({
        collection: "product-categories",
        where: {
            "parent.id": {
                equals: parent.id,
            },
        },
        sort: "order",
    });

    return docs as unknown as ProductCategory[];
}

/**
 * Get a single product category by slug
 */
export async function getProductCategory(slug: string): Promise<ProductCategory | null> {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: "product-categories",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 1,
    });

    return docs[0] ? (docs[0] as unknown as ProductCategory) : null;
}
