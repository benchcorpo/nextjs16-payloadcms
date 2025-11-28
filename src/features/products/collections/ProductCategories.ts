import { CollectionConfig } from "payload";

import i18n from "../i18n/productCategories.json";
import { SlugField } from "@/src/fields/SlugField";

export const ProductCategories: CollectionConfig = {
    slug: "product-categories",
    access: {
        read: ({ req: { user } }) => !!user,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "order"],
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
                            name: "name",
                            type: "text",
                            label: i18n.fields.name,
                            required: true,
                            unique: true,
                        },
                        {
                            name: "parent",
                            type: "relationship",
                            label: i18n.fields.parent,
                            relationTo: "product-categories",
                            filterOptions: ({ id }) => {
                                if (!id) {
                                    return true;
                                }
                                return {
                                    id: {
                                        not_equals: id,
                                    },
                                };
                            },
                        },
                        {
                            name: "description",
                            type: "textarea",
                            label: i18n.fields.description,
                        },
                        {
                            name: "image",
                            type: "upload",
                            label: i18n.fields.image,
                            relationTo: "media",
                        },
                    ],
                },
                {
                    label: i18n.tabs.advanced,
                    fields: [
                        SlugField("name"),
                        {
                            name: "order",
                            type: "number",
                            label: i18n.fields.order,
                            defaultValue: 0,
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};
