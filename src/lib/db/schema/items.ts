import { createId } from "@paralleldrive/cuid2";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { brands } from "./brands";

export const items = pgTable("items", {
  id: text("id").primaryKey().$defaultFn(createId),
  brandId: text("brand_id")
    .notNull()
    .references(() => brands.id),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price"),
  description: text("description"),
  imageKey: varchar("image_key", { length: 512 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
