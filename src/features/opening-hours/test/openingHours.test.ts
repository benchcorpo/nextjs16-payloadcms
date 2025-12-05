import { describe, it, expect } from "vitest";
import { getOpeningHours } from "../queries/openingHours";

describe("Opening Hours queries", () => {
  describe("getOpeningHours", () => {
    it("returns the active opening hours (past start date)", async () => {
      const result = await getOpeningHours();
      expect(result).toBeDefined();
      expect(result?.startDate).toBeDefined();
      // Should be the one from 2020, not 2099
      expect(new Date(result!.startDate).getFullYear()).toBe(2020);
    });

    it("returns consistent results on multiple calls", async () => {
      const result1 = await getOpeningHours();
      const result2 = await getOpeningHours();
      expect(result1).toBeDefined();
      expect(result1?.id).toBe(result2?.id);
    });
  });
});
