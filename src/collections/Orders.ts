import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Orders: CollectionConfig = {
  slug: "orders",
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
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: true,
      admin: {
        description: "Checkout session associated with the order",
      },
    },
  ],
};
