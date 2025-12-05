import { describe, it, expect } from "vitest";
import { getUpcomingEvents, getEvents, getEvent } from "../queries/events";

describe("Events queries", () => {
  describe("getUpcomingEvents", () => {
    it("returns an array of upcoming events", async () => {
      const result = await getUpcomingEvents();
      expect(Array.isArray(result)).toBe(true);
    });

    it("respects limit parameter", async () => {
      const result = await getUpcomingEvents({ limit: 3 });
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getUpcomingEvents({ sort: "-date" });
      expect(Array.isArray(result)).toBe(true);
    });

    it("combines limit and sort options", async () => {
      const result = await getUpcomingEvents({ limit: 5, sort: "date" });
      expect(result.length).toBeLessThanOrEqual(5);
    });
  });

  describe("getEvents", () => {
    it("returns paginated docs structure with default options", async () => {
      const result = await getEvents();
      expect(result.docs).toBeDefined();
      expect(result).toHaveProperty("totalDocs");
      expect(result).toHaveProperty("totalPages");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("limit");
    });

    it("respects limit parameter", async () => {
      const result = await getEvents({ limit: 5 });
      expect(result.limit).toBe(5);
      expect(result.docs.length).toBeLessThanOrEqual(5);
    });

    it("respects page parameter for pagination", async () => {
      const result = await getEvents({ page: 2 });
      expect(result.page).toBe(2);
    });

    it("accepts custom sort parameter", async () => {
      const result = await getEvents({ sort: "title" });
      expect(result.docs).toBeDefined();
    });

    it("combines multiple pagination options", async () => {
      const result = await getEvents({ limit: 10, page: 1, sort: "-date" });
      expect(result.limit).toBe(10);
      expect(result.page).toBe(1);
    });
  });

  describe("getEvent", () => {
    it("returns null for non-existent slug", async () => {
      const result = await getEvent("non-existent-event-slug");
      expect(result).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const result = await getEvent("");
      expect(result).toBeNull();
    });

    it("handles slugs with numbers", async () => {
      const result = await getEvent("event-2024-01");
      expect(result).toBeNull();
    });

    it("handles slugs with special characters", async () => {
      const result = await getEvent("annual-conference-2024");
      expect(result).toBeNull();
    });
  });
});
