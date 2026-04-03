import {
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { items } from "./items";
import { layoutPosts } from "./layout-posts";

export const layoutItems = pgTable(
  "layout_items",
  {
    layoutId: text("layout_id")
      .notNull()
      .references(() => layoutPosts.id),
    itemId: text("item_id")
      .notNull()
      .references(() => items.id),
    positionX: real("position_x").notNull(),
    positionY: real("position_y").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.layoutId, t.itemId] })],
);
