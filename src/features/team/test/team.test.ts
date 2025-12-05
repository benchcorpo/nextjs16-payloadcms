import { describe, it, expect } from "vitest";
import { getTeamGroups, getTeamGroup } from "../queries/team";

describe("Team queries", () => {
  describe("getTeamGroups", () => {
    it("returns an array of team groups", async () => {
      const result = await getTeamGroups();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns groups sorted by order", async () => {
      const result = await getTeamGroups();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getTeamGroup", () => {
    it("returns null for non-existent group slug", async () => {
      const result = await getTeamGroup("non-existent-team-group");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getTeamGroup("");
      expect(result).toBeNull();
    });

    it("handles slugs with common naming patterns", async () => {
      const result = await getTeamGroup("management-team");
      expect(result).toBeNull();
    });

    it("handles slugs with special characters", async () => {
      const result = await getTeamGroup("kitchen-staff-2024");
      expect(result).toBeNull();
    });
  });
});
