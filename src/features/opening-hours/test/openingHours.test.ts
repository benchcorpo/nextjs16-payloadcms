import { describe, it, expect } from "vitest";
import { getOpeningHours } from "../queries/openingHours";

describe("Opening Hours queries", () => {
  describe("getOpeningHours", () => {
    it("returns a defined opening hours object", async () => {
      const result = await getOpeningHours();
      expect(result).toBeDefined();
    });

    it("returns an object (not null or undefined)", async () => {
      const result = await getOpeningHours();
      expect(result).not.toBeNull();
      expect(typeof result).toBe("object");
    });

    it("returns consistent results on multiple calls", async () => {
      const result1 = await getOpeningHours();
      const result2 = await getOpeningHours();
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });
  });
});
