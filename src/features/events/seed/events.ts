import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";
import { createRichTextParagraphs } from "@/src/utils/lexical";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedEvents(payload: Payload) {
  console.log("🌱 Seeding events...");

  const eventImage = await seedAsset(payload, __dirname, "event-placeholder.png", "Event Placeholder");

  for (let i = 0; i < 10; i++) {
    const startDate = faker.date.future();
    const endDate = faker.helpers.maybe(
      () =>
        new Date(
          startDate.getTime() +
          faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000
        )
    );

    await payload.create({
      collection: "events",
      data: {
        title: faker.lorem.sentence(),
        image: eventImage?.id,
        description: createRichTextParagraphs([
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ]),
        location: faker.location.city() + ", " + faker.location.country(),
        date: startDate.toISOString(),
        endDate: endDate?.toISOString(),
        virtualLink: faker.helpers.maybe(() => faker.internet.url()),
        registrationLink: faker.helpers.maybe(() => faker.internet.url()),
      },
    });
  }

  console.log("  ✓ Created 10 events");
  console.log("✅ Events seeded");
}
