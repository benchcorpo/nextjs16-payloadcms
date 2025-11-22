import { CollectionConfig } from "payload";

import i18n from "../i18n";
import { SlugField } from "../fields/SlugField";

export const FAQ: CollectionConfig = {
    slug: "faq",
    access: {
        read: ({ req: { user } }) => !!user,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "order"],
    },
    labels: {
        singular: i18n.collections.faq.labels.singular,
        plural: i18n.collections.faq.labels.plural,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: i18n.collections.faq.tabs.content,
                    fields: [
                        {
                            name: "name",
                            type: "text",
                            label: i18n.collections.faq.fields.name,
                            required: true,
                        },
                        {
                            name: "items",
                            type: "array",
                            label: i18n.collections.faq.fields.items.label,
                            labels: {
                                singular: i18n.collections.faq.fields.items.labels.singular,
                                plural: i18n.collections.faq.fields.items.labels.plural,
                            },
                            fields: [
                                {
                                    name: "question",
                                    type: "text",
                                    label: i18n.collections.faq.fields.items.fields.question,
                                    required: true,
                                },
                                {
                                    name: "answer",
                                    type: "richText",
                                    label: i18n.collections.faq.fields.items.fields.answer,
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: i18n.collections.faq.tabs.advanced,
                    fields: [
                        SlugField("name"),
                        {
                            name: "order",
                            type: "number",
                            label: i18n.collections.faq.fields.order,
                            defaultValue: 0,
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};
