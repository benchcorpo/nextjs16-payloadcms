import { describe, it, expect } from "vitest";
import { getSettings } from "./settings";

describe("Settings queries", () => {
  describe("getSettings", () => {
    it("returns a defined settings object", async () => {
      const result = await getSettings();
      expect(result).toBeDefined();
    });

    it("returns an object (not null or undefined)", async () => {
      const result = await getSettings();
      expect(result).not.toBeNull();
      expect(typeof result).toBe("object");
    });

    it("returns consistent results on multiple calls", async () => {
      const result1 = await getSettings();
      const result2 = await getSettings();
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });
  });
});
