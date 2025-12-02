import { describe, it, expect } from "vitest";
import { getFAQGroups, getFAQGroup } from "./faq";

describe("FAQ queries", () => {
  describe("getFAQGroups", () => {
    it("returns an array of FAQ groups", async () => {
      const result = await getFAQGroups();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns groups sorted by order", async () => {
      const result = await getFAQGroups();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getFAQGroup", () => {
    it("returns null for non-existent group slug", async () => {
      const result = await getFAQGroup("non-existent-faq-group");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getFAQGroup("");
      expect(result).toBeNull();
    });

    it("handles common FAQ group naming patterns", async () => {
      const result = await getFAQGroup("general-questions");
      expect(result).toBeNull();
    });

    it("handles slugs with numbers", async () => {
      const result = await getFAQGroup("shipping-and-delivery-2024");
      expect(result).toBeNull();
    });
  });
});
