import { describe, it, expect } from "vitest";
import { getNews, getNewsItem } from "../queries/news";

describe("News queries", () => {
  describe("getNews", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getNews();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getNews({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getNews({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getNews({ sort: "title" });
      expect(result.docs).toBeDefined();
    });

    it("combines multiple pagination options", async () => {
      const result = await getNews({
        limit: 10,
        page: 1,
        sort: "-publishedDate",
      });
      expect(result.limit).toBe(10);
      expect(result.page).toBe(1);
    });

    it("handles high page number returning empty or valid docs", async () => {
      const result = await getNews({ page: 999 });
      expect(result.docs).toBeDefined();
      expect(Array.isArray(result.docs)).toBe(true);
    });
  });

  describe("getNewsItem", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getNewsItem("non-existent-news-slug");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getNewsItem("");
      expect(result).toBeNull();
    });

    it("handles slugs with date patterns", async () => {
      const result = await getNewsItem("company-news-update-2024");
      expect(result).toBeNull();
    });

    it("handles complex news slugs", async () => {
      const result = await getNewsItem("new-product-launch-announcement");
      expect(result).toBeNull();
    });
  });
});
