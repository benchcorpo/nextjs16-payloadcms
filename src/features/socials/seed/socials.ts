import { Payload } from "payload";

export async function seedSocials(payload: Payload) {
  console.log("🌱 Seeding socials...");

  await payload.updateGlobal({
    slug: "socials",
    data: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  });

  console.log("✅ Socials seeded");
}
