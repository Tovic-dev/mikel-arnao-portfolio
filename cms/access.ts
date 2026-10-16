import type { Access } from "payload";

// Access rules (16 §7): visitors read published content only; every write
// needs a logged-in admin. There is no public sign-up.

/** Logged-in admin. */
export const isAdmin: Access = ({ req }) => Boolean(req.user);

/** Admins see drafts; everyone else only published documents. */
export const publishedOrAdmin: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } };

/** Public read for documents without drafts (media, globals). */
export const anyone: Access = () => true;
