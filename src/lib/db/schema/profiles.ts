import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey().$defaultFn(createId),
  authUserId: uuid("auth_user_id").notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  avatarKey: varchar("avatar_key", { length: 512 }),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
