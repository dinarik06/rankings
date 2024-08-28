import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tracksTable = sqliteTable("tracks", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  link: text("link").notNull(),
});
