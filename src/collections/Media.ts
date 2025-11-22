import type { CollectionConfig } from "payload";

import i18n from "../i18n";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  labels: {
    singular: i18n.collections.media.labels.singular,
    plural: i18n.collections.media.labels.plural,
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
