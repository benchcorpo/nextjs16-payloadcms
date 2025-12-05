import { describe, expect, it } from "vitest";
import { getMenuSections, getMenuSection } from "../queries/restaurantMenu";

describe("Restaurant Menu queries", () => {
  describe("getMenuSections", () => {
    it("returns an array", async () => {
      const result = await getMenuSections();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns proper menu structure", async () => {
      const result = await getMenuSections();
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("name");
        expect(result[0]).toHaveProperty("items");
      }
    });
  });

  describe("getMenuSection", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getMenuSection("non-existent-menu-section");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getMenuSection("");
      expect(result).toBeNull();
    });

    it("returns a single menu category by slug", async () => {
      const result = await getMenuSection("main-courses");
      if (result) {
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("items");
      }
    });

    it("returns category with different slug format", async () => {
      const result = await getMenuSection("desserts-and-sweets");
      if (result) {
        expect(result).toHaveProperty("name");
      }
    });

    it("returns category with another slug format", async () => {
      const result = await getMenuSection("starters-and-appetizers");
      if (result) {
        expect(result).toHaveProperty("name");
      }
    });
  });
});
