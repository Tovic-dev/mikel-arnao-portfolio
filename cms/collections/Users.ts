import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

// Dashboard accounts (16 §7). The first account is created by Mikel on Payload's
// first-run screen; after that only a logged-in admin can add users.
export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "Settings" },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    useSessions: true,
    cookies: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [{ name: "name", type: "text" }],
};
