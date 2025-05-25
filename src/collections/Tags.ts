import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    read: () => true,
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
    useAsTitle: "name",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};
