import { db, Posts, Categories, PostCategories } from "astro:db";

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
        slug: "my-first-blog-post",
      },
    ])
    .returning();

  // Seed PostCategories
  await db.insert(PostCategories).values([
    { postId: post1.id, categoryId: 1 }, // Assuming 1 is the ID for 'Technology'
  ]);
}
