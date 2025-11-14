import { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const FAQItems: CollectionConfig = {
  slug: "faq-items",
  labels: {
    singular: i18n.collections.faqItems.labels.singular,
    plural: i18n.collections.faqItems.labels.plural,
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: i18n.collections.faqItems.tabs.content,
          fields: [
            {
              name: "category",
              type: "relationship",
              label: i18n.collections.faqItems.fields.category,
              relationTo: "faq-groups",
              required: true,
            },
            {
              name: "question",
              type: "text",
              label: i18n.collections.faqItems.fields.question,
              required: true,
            },
            {
              name: "answer",
              type: "richText",
              label: i18n.collections.faqItems.fields.answer,
              required: true,
            },
          ],
        },
        {
          label: i18n.collections.faqItems.tabs.advanced,
          fields: [
            {
              name: "order",
              type: "number",
              label: i18n.collections.faqItems.fields.order,
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
