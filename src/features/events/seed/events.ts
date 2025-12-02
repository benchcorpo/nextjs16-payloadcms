import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";
import { createRichTextParagraphs } from "@/src/utils/lexical";
import { toSlug } from "@/src/fields/SlugField";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedEvents(payload: Payload) {
  console.log("🌱 Seeding events...");

  const eventImage = await seedAsset(payload, __dirname, "event-placeholder.png", "Event Placeholder");

  let createdEvents = 0;
  for (let i = 0; i < 10; i++) {
    const startDate = faker.date.future();
    const endDate = faker.helpers.maybe(
      () =>
        new Date(
          startDate.getTime() +
          faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000
        )
    );

    const title = faker.lorem.sentence();
    const slug = toSlug(title);

    const existing = await payload.find({
      collection: "events",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "events",
        data: {
          title,
          slug,
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
      createdEvents++;
    }
  }

  console.log(`  ✓ Created ${createdEvents} events`);
  console.log("✅ Events seeded");
}
