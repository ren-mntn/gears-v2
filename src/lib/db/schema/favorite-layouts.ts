import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { layoutPosts } from "./layout-posts";
import { profiles } from "./profiles";

export const favoriteLayouts = pgTable(
  "favorite_layouts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => profiles.id),
    layoutId: text("layout_id")
      .notNull()
      .references(() => layoutPosts.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.layoutId] })],
);
