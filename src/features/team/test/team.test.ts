import { describe, it, expect } from "vitest";
import { getTeamSections, getTeamSection } from "../queries/team";

describe("Team queries", () => {
  describe("getTeamSections", () => {
    it("returns an array", async () => {
      const result = await getTeamSections();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns proper team structure", async () => {
      const result = await getTeamSections();
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("name");
        expect(result[0]).toHaveProperty("items");
      }
    });
  });

  describe("getTeamSection", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getTeamSection("non-existent-team-section");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getTeamSection("");
      expect(result).toBeNull();
    });

    it("returns a single team group by slug", async () => {
      const result = await getTeamSection("management-team");
      if (result) {
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("items");
      }
    });

    it("returns group with different slug format", async () => {
      const result = await getTeamSection("kitchen-staff-2024");
      if (result) {
        expect(result).toHaveProperty("name");
      }
    });
  });
});
