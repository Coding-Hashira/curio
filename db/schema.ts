import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image-src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress, {
    relationName: "user-progress",
  }),
  units: many(units, {
    relationName: "units",
  }),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  courseId: integer("course-id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons, {
    relationName: "lessons",
  }),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit-id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges, {
    relationName: "challenges",
  }),
}));

export const challengesEnums = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: challengesEnums("type").notNull(),
  lessonId: integer("lesson-id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
  question: text("question").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions, {
    relationName: "challenge-options",
  }),
  challengeProgress: many(challengeProgress, {
    relationName: "challenge-progress",
  }),
}));

export const challengeOptions = pgTable("challenge-options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge-id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("is-correct").notNull(),
  imageSrc: text("image-src"),
  audioSrc: text("audio-src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge-progress", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge-id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user-id").notNull(), // TODO: Confirm this doesn't break
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user-progress", {
  userId: text("user-id").primaryKey(),
  userName: text("user-name").notNull().default("User"),
  userImageSrc: text("user-image-src").notNull().default("/logo.svg"),
  activeCourseId: integer("active-course-id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
