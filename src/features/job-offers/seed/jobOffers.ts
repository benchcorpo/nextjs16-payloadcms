import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichTextParagraphs } from "@/src/utils/lexical";
import { toSlug } from "@/src/fields/SlugField";

export async function seedJobOffers(payload: Payload) {
  console.log("🌱 Seeding job offers...");

  let createdOffers = 0;
  for (let i = 0; i < 8; i++) {
    const title = faker.person.jobTitle();
    const slug = toSlug(title);

    const existing = await payload.find({
      collection: "job-offers",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "job-offers",
        data: {
          title,
          slug,
          location: faker.location.city() + ", " + faker.location.country(),
          description: createRichTextParagraphs([
            faker.lorem.paragraph(),
            faker.lorem.paragraph(),
            faker.lorem.paragraph(),
          ]),
          requirements: createRichTextParagraphs([
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
          ]),
          applicationLink: faker.internet.url(),
          active: faker.datatype.boolean({ probability: 0.7 }),
          postedDate: faker.date.recent({ days: 30 }).toISOString(),
        },
      });
      createdOffers++;
    }
  }

  console.log(`  ✓ Created ${createdOffers} job offers`);
  console.log("✅ Job offers seeded");
}
