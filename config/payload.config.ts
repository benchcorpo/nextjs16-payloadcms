import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { en } from "payload/i18n/en";
import { fr } from "payload/i18n/fr";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Events } from "./collections/Events";
import { FAQItems } from "./collections/FAQItems";
import { FAQGroups } from "./collections/FAQGroups";
import { JobOffers } from "./collections/JobOffers";
import { TeamItems } from "./collections/TeamItems";
import { TeamGroups } from "./collections/TeamGroups";
import { Testimonials } from "./collections/Testimonials";
import { PressReleases } from "./collections/PressReleases";
import { BlogPosts } from "./collections/BlogPosts";
import { BlogAuthors } from "./collections/BlogAuthors";
import { BlogCategories } from "./collections/BlogCategories";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    TeamGroups,
    TeamItems,
    Events,
    JobOffers,
    Testimonials,
    PressReleases,
    FAQGroups,
    FAQItems,
    BlogCategories,
    BlogAuthors,
    BlogPosts,
  ],
  i18n: {
    supportedLanguages: { en, fr },
    fallbackLanguage: "fr",
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
