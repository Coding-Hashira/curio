import "dotenv/config";
import type { Config } from "drizzle-kit";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
