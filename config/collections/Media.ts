import type { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: i18n.collections.media.labels.singular,
    plural: i18n.collections.media.labels.plural,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: i18n.collections.media.fields.alt,
      required: true,
    },
  ],
  upload: {
    staticDir: "./uploads",
  },
};
