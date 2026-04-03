import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: env var validated at startup
    url: process.env.DATABASE_URL!,
  },
});
