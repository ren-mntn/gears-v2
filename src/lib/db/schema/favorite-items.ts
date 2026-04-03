import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { items } from "./items";
import { profiles } from "./profiles";

export const favoriteItems = pgTable(
  "favorite_items",
  {
    userId: text("user_id")
      .notNull()
      .references(() => profiles.id),
    itemId: text("item_id")
      .notNull()
      .references(() => items.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.itemId] })],
);
