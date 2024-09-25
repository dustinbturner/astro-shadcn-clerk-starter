import { defineDb, defineTable, column } from "astro:db";

const Posts = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    slug: column.text({ unique: true }),
    title: column.text(),
    // Add other columns as needed
  },
});

const Categories = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    slug: column.text({ unique: true }),
  },
});

const PostCategories = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    postId: column.number({ references: () => Posts.columns.id }),
    categoryId: column.number({ references: () => Categories.columns.id }),
  },
});

const Views = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    postId: column.number({ references: () => Posts.columns.id }),
    viewedAt: column.date(),
  },
});

const Likes = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    postId: column.number({ references: () => Posts.columns.id }),
    likedAt: column.date(),
  },
});

export default defineDb({
  tables: { Posts, Categories, PostCategories, Views, Likes },
});
