import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { layoutPosts } from "./layout-posts";
import { profiles } from "./profiles";

export const commentActionEnum = pgEnum("comment_action", ["POST", "DELETE"]);

export const commentEvents = pgTable("comment_events", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id")
    .notNull()
    .references(() => profiles.id),
  layoutId: text("layout_id")
    .notNull()
    .references(() => layoutPosts.id),
  action: commentActionEnum("action").notNull(),
  body: text("body"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
