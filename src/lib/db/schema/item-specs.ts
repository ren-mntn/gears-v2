import { createId } from "@paralleldrive/cuid2";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { items } from "./items";

export const itemSpecs = pgTable("item_specs", {
  id: text("id").primaryKey().$defaultFn(createId),
  itemId: text("item_id")
    .notNull()
    .references(() => items.id),
  specs: jsonb("specs").notNull().$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
