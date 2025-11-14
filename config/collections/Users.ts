import type { CollectionConfig } from "payload";

import i18n from "../i18n.json";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: i18n.collections.users.labels.singular,
    plural: i18n.collections.users.labels.plural,
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
