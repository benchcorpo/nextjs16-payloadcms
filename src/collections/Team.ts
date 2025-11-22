import { CollectionConfig } from "payload";

import i18n from "../i18n";
import { SlugField } from "../fields/SlugField";

export const Team: CollectionConfig = {
    slug: "team",
    access: {
        read: ({ req: { user } }) => !!user,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "order"],
    },
    labels: {
        singular: i18n.collections.team.labels.singular,
        plural: i18n.collections.team.labels.plural,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: i18n.collections.team.tabs.content,
                    fields: [
                        {
                            name: "name",
                            type: "text",
                            label: i18n.collections.team.fields.name,
                            required: true,
                        },
                        {
                            name: "items",
                            type: "array",
                            label: i18n.collections.team.fields.items.label,
                            labels: {
                                singular: i18n.collections.team.fields.items.labels.singular,
                                plural: i18n.collections.team.fields.items.labels.plural,
                            },
                            fields: [
                                {
                                    name: "name",
                                    type: "text",
                                    label: i18n.collections.team.fields.items.fields.name,
                                    required: true,
                                },
                                {
                                    name: "role",
                                    type: "text",
                                    label: i18n.collections.team.fields.items.fields.role,
                                    required: true,
                                },
                                {
                                    name: "bio",
                                    type: "textarea",
                                    label: i18n.collections.team.fields.items.fields.bio,
                                },
                                {
                                    name: "photo",
                                    type: "upload",
                                    label: i18n.collections.team.fields.items.fields.photo,
                                    relationTo: "media",
                                },
                                {
                                    name: "email",
                                    type: "email",
                                    label: i18n.collections.team.fields.items.fields.email,
                                },
                                {
                                    name: "phone",
                                    type: "text",
                                    label: i18n.collections.team.fields.items.fields.phone,
                                },
                                {
                                    type: "row",
                                    fields: [
                                        {
                                            name: "linkedin",
                                            type: "text",
                                            label: i18n.collections.team.fields.items.fields.linkedin,
                                        },
                                        {
                                            name: "twitter",
                                            type: "text",
                                            label: i18n.collections.team.fields.items.fields.twitter,
                                        },
                                    ],
                                },
                                {
                                    type: "row",
                                    fields: [
                                        {
                                            name: "facebook",
                                            type: "text",
                                            label: i18n.collections.team.fields.items.fields.facebook,
                                        },
                                        {
                                            name: "instagram",
                                            type: "text",
                                            label: i18n.collections.team.fields.items.fields.instagram,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: i18n.collections.team.tabs.advanced,
                    fields: [
                        SlugField("name"),
                        {
                            name: "order",
                            type: "number",
                            label: i18n.collections.team.fields.order,
                            defaultValue: 0,
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};
