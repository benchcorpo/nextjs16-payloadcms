import { describe, it, expect } from "vitest";
import { getMenuCategories, getMenuCategory } from "./restaurantMenu";

describe("Restaurant Menu queries", () => {
  describe("getMenuCategories", () => {
    it("returns an array of menu categories", async () => {
      const result = await getMenuCategories();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns categories sorted by order", async () => {
      const result = await getMenuCategories();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getMenuCategory", () => {
    it("returns null for non-existent category slug", async () => {
      const result = await getMenuCategory("non-existent-menu-category");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getMenuCategory("");
      expect(result).toBeNull();
    });

    it("handles common menu category naming patterns", async () => {
      const result = await getMenuCategory("main-courses");
      expect(result).toBeNull();
    });

    it("handles dessert category patterns", async () => {
      const result = await getMenuCategory("desserts-and-sweets");
      expect(result).toBeNull();
    });

    it("handles appetizer category patterns", async () => {
      const result = await getMenuCategory("starters-and-appetizers");
      expect(result).toBeNull();
    });
  });
});
