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

  for (let i = 0; i < 12; i++) {
    await payload.create({
      collection: "testimonials",
      data: {
        client: faker.person.fullName(),
        company: faker.helpers.maybe(() => faker.company.name()),
        quote: faker.lorem.paragraph(),
        photo: authorImage?.id,
        rating: faker.number.int({ min: 4, max: 5 }),
        date: faker.date.past({ years: 2 }).toISOString(),
      },
    });
  }

  console.log("  ✓ Created 12 testimonials");
  console.log("✅ Testimonials seeded");
}
