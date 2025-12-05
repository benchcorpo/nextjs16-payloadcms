import { describe, it, expect } from "vitest";
import { getTestimonials } from "../queries/testimonials";

describe("Testimonials queries", () => {
  describe("getTestimonials", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getTestimonials();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getTestimonials({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getTestimonials({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getTestimonials({ sort: "date" });
      expect(result.docs).toBeDefined();
    });

    it("combines multiple pagination options", async () => {
      const result = await getTestimonials({
        limit: 10,
        page: 1,
        sort: "-date",
      });
      expect(result.limit).toBe(10);
      expect(result.page).toBe(1);
    });

    it("handles high page number returning empty or valid docs", async () => {
      const result = await getTestimonials({ page: 999 });
      expect(result.docs).toBeDefined();
      expect(Array.isArray(result.docs)).toBe(true);
    });
  });
});
