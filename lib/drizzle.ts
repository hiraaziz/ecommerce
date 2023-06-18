import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "@vercel/postgres";

export const cartTable = pgTable("cart", {
  id: serial("id").primaryKey(),
  userid: varchar("userid", { length: 255 }).notNull(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
});

export const authTable = pgTable("auth", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const db = drizzle(sql);
