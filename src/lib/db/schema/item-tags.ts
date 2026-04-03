import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { items } from "./items";
import { tags } from "./tags";

export const itemTags = pgTable(
  "item_tags",
  {
    itemId: text("item_id")
      .notNull()
      .references(() => items.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.itemId, t.tagId] })],
);
