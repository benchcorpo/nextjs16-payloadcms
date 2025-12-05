import { describe, it, expect } from "vitest";
import {
  getCatalogItems,
  getCatalogItem,
  getRootCatalogCategories,
  getCatalogSubCategories,
  getCatalogCategory,
} from "../queries/catalog";

describe("Catalog queries", () => {
  describe("getCatalogItems", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getCatalogItems();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getCatalogItems({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getCatalogItems({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("filters by non-existent category returning empty docs", async () => {
      const result = await getCatalogItems({
        category: "non-existent-category",
      });
      expect(result.docs).toEqual([]);
    });

    it("combines limit and page options", async () => {
      const result = await getCatalogItems({ limit: 3, page: 1 });
      expect(result.limit).toBe(3);
      expect(result.page).toBe(1);
    });

    it("combines all filter options", async () => {
      const result = await getCatalogItems({
        limit: 10,
        page: 1,
        category: "electronics",
      });
      expect(result.docs).toBeDefined();
    });
  });

  describe("getCatalogItem", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getCatalogItem("non-existent-item-slug");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getCatalogItem("");
      expect(result).toBeNull();
    });

    it("handles slugs with numbers", async () => {
      const result = await getCatalogItem("product-12345");
      expect(result).toBeNull();
    });

    it("handles complex slugs with hyphens", async () => {
      const result = await getCatalogItem("ultra-high-definition-display-4k");
      expect(result).toBeNull();
    });
  });

  describe("getRootCatalogCategories", () => {
    it("returns an array of root categories", async () => {
      const result = await getRootCatalogCategories();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getCatalogSubCategories", () => {
    it("returns empty array for non-existent parent slug", async () => {
      const result = await getCatalogSubCategories("non-existent-parent");
      expect(result).toEqual([]);
    });

    it("returns empty array for empty parent slug", async () => {
      const result = await getCatalogSubCategories("");
      expect(result).toEqual([]);
    });

    it("handles parent slug with special characters", async () => {
      const result = await getCatalogSubCategories("parent-category-123");
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getCatalogCategory", () => {
    it("returns null for non-existent category slug", async () => {
      const result = await getCatalogCategory("non-existent-category");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getCatalogCategory("");
      expect(result).toBeNull();
    });

    it("handles slugs with numbers", async () => {
      const result = await getCatalogCategory("category-2024");
      expect(result).toBeNull();
    });
  });
});
