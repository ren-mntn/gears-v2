import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const layoutPosts = pgTable("layout_posts", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id")
    .notNull()
    .references(() => profiles.id),
  imageKey: varchar("image_key", { length: 512 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
