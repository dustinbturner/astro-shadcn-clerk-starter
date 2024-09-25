import { db, Posts, Categories, PostCategories, WaitingList } from "astro:db";

export default async function seed() {
  // Seed Categories
  await db.insert(Categories).values([
    { name: "Technology", slug: "technology" },
    { name: "Travel", slug: "travel" },
    { name: "Food", slug: "food" },
  ]);

  // Seed Posts
  const [post1] = await db
    .insert(Posts)
    .values([
      {
        title: "My First Blog Post",
        content: "This is the content of my first blog post.",
        slug: "my-first-blog-post",
        authorId: "user_123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();

  // Seed PostCategories
  await db.insert(PostCategories).values([
    { postId: post1.id, categoryId: 1 }, // Assuming 1 is the ID for 'Technology'
  ]);

  // Keep the WaitingList seed if you still need it
  await db
    .insert(WaitingList)
    .values([
      { email: "johndoe@example.com" },
      { email: "janedoe@example.com" },
    ]);
}
