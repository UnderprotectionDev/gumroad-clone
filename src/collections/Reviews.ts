import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: {
    read: ({ req }) => {
      const user = req.user;
      return isSuperAdmin(user);
    },
    create: ({ req }) => {
      const user = req.user;
      return isSuperAdmin(user);
    },
    update: ({ req }) => {
      const user = req.user;
      return isSuperAdmin(user);
    },
    delete: ({ req }) => {
      const user = req.user;
      return isSuperAdmin(user);
    },
  },
  admin: {
    useAsTitle: "description",
  },
  fields: [
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
  ],
};
