import { describe, it, expect } from "vitest";
import {
  getActiveJobOffers,
  getJobOffers,
  getJobOffer,
} from "../queries/jobOffers";

describe("Job Offers queries", () => {
  describe("getActiveJobOffers", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getActiveJobOffers();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getActiveJobOffers({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getActiveJobOffers({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getActiveJobOffers({ sort: "title" });
      expect(result.docs).toBeDefined();
    });

    it("combines multiple pagination options", async () => {
      const result = await getActiveJobOffers({
        limit: 10,
        page: 1,
        sort: "-postedDate",
      });
      expect(result.limit).toBe(10);
      expect(result.page).toBe(1);
    });
  });

  describe("getJobOffers", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getJobOffers();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getJobOffers({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getJobOffers({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getJobOffers({ sort: "title" });
      expect(result.docs).toBeDefined();
    });

    it("combines multiple pagination options", async () => {
      const result = await getJobOffers({
        limit: 10,
        page: 1,
        sort: "-postedDate",
      });
      expect(result.limit).toBe(10);
      expect(result.page).toBe(1);
    });

    it("handles high page number returning empty or valid docs", async () => {
      const result = await getJobOffers({ page: 999 });
      expect(result.docs).toBeDefined();
      expect(Array.isArray(result.docs)).toBe(true);
    });
  });

  describe("getJobOffer", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getJobOffer("non-existent-job-slug");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getJobOffer("");
      expect(result).toBeNull();
    });

    it("handles slugs with common job title patterns", async () => {
      const result = await getJobOffer("senior-software-engineer");
      expect(result).toBeNull();
    });

    it("handles slugs with location patterns", async () => {
      const result = await getJobOffer("marketing-manager-new-york");
      expect(result).toBeNull();
    });
  });
});
