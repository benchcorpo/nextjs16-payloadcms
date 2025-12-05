import { describe, it, expect } from "vitest";
import {
  getBlogPosts,
  getBlogPost,
  getBlogCategories,
  getBlogAuthors,
  getBlogAuthor,
  getBlogCategory,
  getBlogPostsByAuthor,
  getBlogPostsByCategory,
} from "../queries/blog";

describe("Blog queries", () => {
  describe("getBlogPosts", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getBlogPosts();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getBlogPosts({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getBlogPosts({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("filters by non-existent category returning empty docs", async () => {
      const result = await getBlogPosts({
        category: "non-existent-category-slug",
      });
      expect(result.docs).toEqual([]);
    });

    it("filters by non-existent author returning empty docs", async () => {
      const result = await getBlogPosts({ author: "non-existent-author-slug" });
      expect(result.docs).toEqual([]);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getBlogPosts({ sort: "title" });
      expect(result.docs).toBeDefined();
    });

    it("combines multiple filter options", async () => {
      const result = await getBlogPosts({
        limit: 3,
        page: 1,
        category: "non-existent",
        author: "non-existent",
      });
      expect(result.docs).toEqual([]);
    });
  });

  describe("getBlogPost", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getBlogPost("non-existent-slug");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getBlogPost("");
      expect(result).toBeNull();
    });

    it("handles special characters in slug", async () => {
      const result = await getBlogPost("slug-with-special-chars-123");
      expect(result).toBeNull();
    });
  });

  describe("getBlogCategories", () => {
    it("returns an array of categories", async () => {
      const result = await getBlogCategories();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getBlogAuthors", () => {
    it("returns an array of authors", async () => {
      const result = await getBlogAuthors();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getBlogAuthor", () => {
    it("returns null for non-existent author slug", async () => {
      const result = await getBlogAuthor("non-existent-author");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getBlogAuthor("");
      expect(result).toBeNull();
    });
  });

  describe("getBlogCategory", () => {
    it("returns null for non-existent category slug", async () => {
      const result = await getBlogCategory("non-existent-category");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getBlogCategory("");
      expect(result).toBeNull();
    });
  });

  describe("getBlogPostsByAuthor", () => {
    it("returns paginated docs structure", async () => {
      const result = await getBlogPostsByAuthor("some-author");
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
    });

    it("returns empty docs for non-existent author", async () => {
      const result = await getBlogPostsByAuthor("non-existent-author");
      expect(result.docs).toEqual([]);
    });

    it("respects custom limit parameter", async () => {
      const result = await getBlogPostsByAuthor("some-author", 3);
      expect(result.limit).toBe(3);
    });
  });

  describe("getBlogPostsByCategory", () => {
    it("returns paginated docs structure", async () => {
      const result = await getBlogPostsByCategory("some-category");
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
    });

    it("returns empty docs for non-existent category", async () => {
      const result = await getBlogPostsByCategory("non-existent-category");
      expect(result.docs).toEqual([]);
    });

    it("respects custom limit parameter", async () => {
      const result = await getBlogPostsByCategory("some-category", 3);
      expect(result.limit).toBe(3);
    });
  });
});
