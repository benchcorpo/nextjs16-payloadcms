import { CollectionConfig } from "payload";

import i18n from "../i18n.json";
import { SlugField } from "../fields/SlugField";

export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
  labels: {
    singular: i18n.collections.blogCategories.labels.singular,
    plural: i18n.collections.blogCategories.labels.plural,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.blogCategories.tabs.content,
          fields: [
            {
              name: "name",
              type: "text",
              label: i18n.collections.blogCategories.fields.name,
              required: true,
              unique: true,
            },
            {
              name: "description",
              type: "textarea",
              label: i18n.collections.blogCategories.fields.description,
            },
            {
              name: "icon",
              type: "upload",
              label: i18n.collections.blogCategories.fields.icon,
              relationTo: "media",
            },
          ],
        },
        {
          label: i18n.collections.blogCategories.tabs.advanced,
          fields: [
            SlugField("name"),
            {
              name: "order",
              type: "number",
              label: i18n.collections.blogCategories.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
