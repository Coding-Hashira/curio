import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "./schema";

export const getCourses = cache(async () => {
  const courses = await db.query.courses.findMany();
  return courses;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress?.userId, userId),
    with: { activeCourse: true },
  });

  return data;
});

export const getCourseById = cache(async (id: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
    // TODO: Populate units and lessons
  });

  return data;
});
