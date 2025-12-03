import { describe, it, expect } from "vitest";
import { getContact } from "./contact";

describe("Contact queries", () => {
  describe("getContact", () => {
    it("returns contact settings", async () => {
      const result = await getContact();
      expect(result).toBeDefined();
      expect(result.info).toBeDefined();
      expect(result.socials).toBeDefined();
    });
  });
});
