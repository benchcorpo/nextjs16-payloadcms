import { CollectionConfig } from "payload";

import i18n from "../i18n/pressReleases.json";
import { SlugField } from "@/src/fields/SlugField";

export const PressReleases: CollectionConfig = {
  slug: "press-releases",
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
              name: "journal",
              type: "text",
              label: i18n.fields.journal,
            },
            {
              name: "excerpt",
              type: "richText",
              label: i18n.fields.excerpt,
            },
            {
              name: "link",
              type: "text",
              label: i18n.fields.link,
            },
            {
              name: "publishedDate",
              type: "date",
              label: i18n.fields.publishedDate,
              required: true,
            },
          ],
        },
        {
          label: i18n.tabs.advanced,
          fields: [
            SlugField("title"),
          ],
        },
      ],
    },
  ],
};
