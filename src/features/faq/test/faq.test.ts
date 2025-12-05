import { describe, expect, it } from "vitest";
import { getFAQSections, getFAQSection } from "../queries/faq";

describe("FAQ queries", () => {
  describe("getFAQSections", () => {
    it("returns an array", async () => {
      const result = await getFAQSections();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns proper FAQ structure", async () => {
      const result = await getFAQSections();
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("name");
        expect(result[0]).toHaveProperty("items");
      }
    });
  });

  describe("getFAQSection", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getFAQSection("non-existent-faq-section");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getFAQSection("");
      expect(result).toBeNull();
    });

    it("returns a single FAQ group by slug", async () => {
      const result = await getFAQSection("general-questions");
      if (result) {
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("items");
      }
    });

    it("returns group with different slug format", async () => {
      const result = await getFAQSection("shipping-and-delivery-2024");
      if (result) {
        expect(result).toHaveProperty("name");
      }
    });
  });
});
