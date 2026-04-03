import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const brands = pgTable("brands", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 255 }).notNull().unique(),
  logoKey: varchar("logo_key", { length: 512 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
