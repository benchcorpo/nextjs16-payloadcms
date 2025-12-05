import { CollectionConfig, Field } from "payload";

import i18n from "../i18n/openingHours.json";

const dayFields: Field[] = [
  {
    name: "open",
    type: "text",
    label: i18n.fields.openTime,
  },
  {
    name: "close",
    type: "text",
    label: i18n.fields.closeTime,
  },
  {
    name: "isOpen",
    type: "checkbox",
    label: i18n.fields.isOpen,
    defaultValue: true,
  },
];

export const OpeningHours: CollectionConfig = {
  slug: "opening-hours",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "startDate",
  },
  labels: i18n.label,
  fields: [
    {
      name: "startDate",
      type: "date",
      required: true,
      unique: true,
      label: i18n.fields.startDate,
      defaultValue: () => new Date(),
    },
    {
      name: "monday",
      type: "group",
      label: i18n.fields.monday,
      fields: dayFields,
    },
    {
      name: "tuesday",
      type: "group",
      label: i18n.fields.tuesday,
      fields: dayFields,
    },
    {
      name: "wednesday",
      type: "group",
      label: i18n.fields.wednesday,
      fields: dayFields,
    },
    {
      name: "thursday",
      type: "group",
      label: i18n.fields.thursday,
      fields: dayFields,
    },
    {
      name: "friday",
      type: "group",
      label: i18n.fields.friday,
      fields: dayFields,
    },
    {
      name: "saturday",
      type: "group",
      label: i18n.fields.saturday,
      fields: dayFields,
    },
    {
      name: "sunday",
      type: "group",
      label: i18n.fields.sunday,
      fields: dayFields,
    },
  ],
};
