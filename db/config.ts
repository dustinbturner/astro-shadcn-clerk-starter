import { column, defineDb, defineTable } from "astro:db";

const Posts = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    title: column.text(),
    content: column.text(),
    slug: column.text({ unique: true }),
    authorId: column.text(),
    createdAt: column.date(),
    updatedAt: column.date(),
    coverImage: column.text(),
    category: column.text(),
  },
});

const Categories = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text({ unique: true }),
    slug: column.text({ unique: true }),
  },
});

const PostCategories = defineTable({
  columns: {
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
    userId: column.text(),
    likedAt: column.date(),
  },
});

// Keep the WaitingList table if you still need it
const WaitingList = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
  },
});

export default defineDb({
  tables: {
    Posts,
    Categories,
    PostCategories,
    Views,
    Likes,
    WaitingList, // Keep this if you still need the WaitingList functionality
  },
});
