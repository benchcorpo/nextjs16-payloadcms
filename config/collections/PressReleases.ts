import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const PressReleases: CollectionConfig = {
  slug: "press-releases",
  labels: {
    singular: i18n.collections.pressReleases.labels.singular,
    plural: i18n.collections.pressReleases.labels.plural,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: i18n.collections.pressReleases.fields.title,
      required: true,
    },
    {
      name: "journal",
      type: "text",
      label: i18n.collections.pressReleases.fields.journal,
    },
    {
      name: "excerpt",
      type: "richText",
      label: i18n.collections.pressReleases.fields.excerpt,
    },
    {
      name: "link",
      type: "text",
      label: i18n.collections.pressReleases.fields.link,
    },
    {
      name: "publishedDate",
      type: "date",
      label: i18n.collections.pressReleases.fields.publishedDate,
      required: true,
    },
  ],
};
