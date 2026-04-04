import { createId } from "@paralleldrive/cuid2";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const tagTypeEnum = pgEnum("tag_type", ["category", "color", "feature"]);

export const tags = pgTable("tags", {
  id: text("id").primaryKey().$defaultFn(createId),
  tagType: tagTypeEnum("tag_type").notNull(),
  parentId: text("parent_id").references((): AnyPgColumn => tags.id),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
