import { Payload } from "payload";

export async function seedOpeningHours(payload: Payload) {
  console.log("🌱 Seeding opening hours...");

  // Create a past opening hours (active)
  await payload.create({
    collection: "opening-hours",
    data: {
      startDate: "2020-01-01T00:00:00.000Z",
      monday: { isOpen: true, open: "09:00", close: "18:00" },
      tuesday: { isOpen: true, open: "09:00", close: "18:00" },
      wednesday: { isOpen: true, open: "09:00", close: "18:00" },
      thursday: { isOpen: true, open: "09:00", close: "18:00" },
      friday: { isOpen: true, open: "09:00", close: "17:00" },
      saturday: { isOpen: true, open: "10:00", close: "16:00" },
      sunday: { isOpen: false },
    },
  });

  // Create a future opening hours (not active yet)
  await payload.create({
    collection: "opening-hours",
    data: {
      startDate: "2099-01-01T00:00:00.000Z",
      monday: { isOpen: true, open: "10:00", close: "20:00" }, // Different hours
      tuesday: { isOpen: true, open: "10:00", close: "20:00" },
      wednesday: { isOpen: true, open: "10:00", close: "20:00" },
      thursday: { isOpen: true, open: "10:00", close: "20:00" },
      friday: { isOpen: true, open: "10:00", close: "19:00" },
      saturday: { isOpen: true, open: "11:00", close: "18:00" },
      sunday: { isOpen: false },
    },
  });

  console.log("✅ Opening hours seeded");
}
