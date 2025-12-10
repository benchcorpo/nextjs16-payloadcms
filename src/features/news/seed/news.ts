import path from "path";
import { Payload } from "payload";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { seedAsset } from "@/src/utils/seed";
import { createRichText } from "@/src/utils/lexical";
import { toSlug } from "@/src/fields/SlugField";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedNews(payload: Payload) {
  console.log("🌱 Seeding news...");

  const newsImage = await seedAsset(
    payload,
    __dirname,
    "news-placeholder.png",
    "News Placeholder",
  );

  let createdNews = 0;
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence();
    const slug = toSlug(title);

    const existing = await payload.find({
      collection: "news",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "news",
        data: {
          title,
          slug,
          content: createRichText(
            faker.lorem.paragraphs(3, "\n\n"),
          ),
          publishedDate: faker.date.past({ years: 1 }).toISOString(),
          image: newsImage?.id,
        },
      });
      createdNews++;
    }
  }

  console.log(`  ✓ Created ${createdNews} news items`);
  console.log("✅ News seeded");
}
