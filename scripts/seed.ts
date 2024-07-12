//  =convert these into require syntax
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Maths",
        imageSrc: "/maths.svg",
      },
      {
        id: 2,
        title: "Physics",
        imageSrc: "/physics.svg",
      },
      {
        id: 3,
        title: "Chemistry",
        imageSrc: "/chemistry.svg",
      },
      {
        id: 4,
        title: "Computer Science",
        imageSrc: "/programming.svg",
      },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
