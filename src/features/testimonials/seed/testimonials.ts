import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedTestimonials(payload: Payload) {
  console.log("🌱 Seeding testimonials...");

  const authorImage = await seedAsset(
    payload,
    __dirname,
    "testimonial-author-placeholder.png",
    "Testimonial Author Placeholder",
  );

  let createdCount = 0;
  for (let i = 0; i < 12; i++) {
    const client = faker.person.fullName();

    const existing = await payload.find({
      collection: "testimonials",
      where: { client: { equals: client } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "testimonials",
        data: {
          client,
          company: faker.helpers.maybe(() => faker.company.name()),
          quote: faker.lorem.paragraph(),
          photo: authorImage?.id,
          rating: faker.number.int({ min: 4, max: 5 }),
          date: faker.date.past({ years: 2 }).toISOString(),
        },
      });
      createdCount++;
    }
  }

  console.log(`  ✓ Created ${createdCount} testimonials`);
  console.log("✅ Testimonials seeded");
}
