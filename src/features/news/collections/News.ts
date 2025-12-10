import { CollectionConfig } from "payload";

import i18n from "../i18n/news.json";
import { SlugField } from "@/src/fields/SlugField";

export const News: CollectionConfig = {
  slug: "news",
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate"],
  },
  labels: {
    singular: i18n.labels.singular,
    plural: i18n.labels.plural,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.tabs.content,
          fields: [
            {
              name: "title",
              type: "text",
              label: i18n.fields.title,
              required: true,
            },
            {
              name: "content",
              type: "richText",
              label: i18n.fields.content,
              required: true,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: i18n.fields.image,
            },
          ],
        },
        {
          label: i18n.tabs.advanced,
          fields: [
            SlugField("title"),
            {
              name: "publishedDate",
              type: "date",
              label: i18n.fields.publishedDate,
              defaultValue: () => new Date(),
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
