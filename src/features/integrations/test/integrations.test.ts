import { describe, it, expect } from "vitest";
import { getIntegrations } from "../queries/integrations";

describe("Integrations queries", () => {
  describe("getIntegrations", () => {
    it("returns integration settings", async () => {
      const result = await getIntegrations();
      expect(result).toBeDefined();
    });
  });
});
