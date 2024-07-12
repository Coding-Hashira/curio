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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

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

    await db.insert(schema.units).values([
      {
        id: 1,
        title: "Algebra",
        description: "Learn the basics of algebra",
        courseId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "Geometry",
        description: "Learn the basics of geometry",
        courseId: 1,
        order: 2,
      },
      {
        id: 3,
        title: "Calculus",
        description: "Learn the basics of calculus",
        courseId: 1,
        order: 3,
      },
      {
        id: 4,
        title: "Differential Equations",
        description: "Learn the basics of differential equations",
        courseId: 1,
        order: 4,
      },
      {
        id: 5,
        title: "Vector Calculus",
        description: "Learn the basics of vector calculus",
        courseId: 1,
        order: 5,
      },
      {
        id: 6,
        courseId: 2,
        title: "Mechanics I",
        description: "Learn the basics of mechanics",
        order: 1,
      },
      {
        id: 7,
        courseId: 2,
        title: "Mechanics II",
        description: "Learn the intermediates of mechanics",
        order: 2,
      },
      {
        id: 8,
        courseId: 2,
        title: "Electromagnetism",
        description: "Learn the basics of electromagnetism",
        order: 3,
      },
      {
        id: 9,
        courseId: 2,
        title: "Fluid Mechanics",
        description: "Learn the basics of fluid mechanics",
        order: 4,
      },
      {
        id: 10,
        courseId: 2,
        title: "Modern Physics",
        description: "Learn the basics of modern physics",
        order: 5,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        title: "Introduction to Algebra",
        unitId: 1,
        order: 1,
      },
      { id: 2, unitId: 1, title: "Algebraic Operations", order: 2 },
      { id: 3, unitId: 1, title: "Linear Equations", order: 3 },
      { id: 4, unitId: 6, title: "Introduction to Mechanics", order: 1 },
      { id: 5, unitId: 6, title: "Kinematics", order: 2 },
      { id: 6, unitId: 6, title: "Dynamics", order: 3 },
      { id: 7, unitId: 6, title: "Forces and Newton's Laws", order: 4 },
      { id: 9, unitId: 6, title: "Circular Motion", order: 6 },
      { id: 8, unitId: 6, title: "Work, Energy, and Power", order: 5 },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        title: "Challenge 1",
        type: "SELECT",
        question:
          "What is the standard unit of force in the International System of Units (SI)?",
        lessonId: 4,
        order: 1,
      },
      {
        id: 2,
        title: "Challenge 2",
        type: "SELECT",
        question:
          "Which physical quantity describes the amount of matter in an object?",
        lessonId: 4,
        order: 2,
      },
      {
        id: 3,
        title: "Challenge 3",
        type: "SELECT",
        question:
          "Which of the following is the unit of mass in the International System of Units (SI)?",
        lessonId: 4,
        order: 3,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      { id: 1, challengeId: 1, text: "N", correct: false },
      { id: 2, challengeId: 1, text: "kg", correct: true },
      { id: 3, challengeId: 1, text: "sec", correct: false },
      { id: 4, challengeId: 1, text: "meter", correct: false },
      { id: 5, challengeId: 2, text: "Mass", correct: true },
      { id: 6, challengeId: 2, text: "Weight", correct: false },
      { id: 7, challengeId: 2, text: "Force", correct: true },
      { id: 8, challengeId: 2, text: "Velocity", correct: false },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
