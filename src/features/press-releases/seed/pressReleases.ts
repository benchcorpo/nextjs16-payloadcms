import { Payload } from "payload";
import { faker } from "@faker-js/faker";
import { createRichText } from "@/src/utils/lexical";

export async function seedPressReleases(payload: Payload) {
  console.log("🌱 Seeding press releases...");

  let createdReleases = 0;
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence();
    const slug = faker.helpers.slugify(title).toLowerCase();

    const existing = await payload.find({
      collection: "press-releases",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "press-releases",
        data: {
          title,
          slug,
          journal: faker.helpers.maybe(
            () =>
              faker.company.name() +
              " " +
              faker.helpers.arrayElement(["News", "Times", "Journal", "Post"])
          ),
          excerpt: faker.helpers.maybe(() =>
            createRichText(faker.lorem.paragraph())
          ),
          link: faker.helpers.maybe(() => faker.internet.url()),
          publishedDate: faker.date.past({ years: 1 }).toISOString(),
        },
      });
      createdReleases++;
    }
  }

  console.log(`  ✓ Created ${createdReleases} press releases`);
  console.log("✅ Press releases seeded");
}
