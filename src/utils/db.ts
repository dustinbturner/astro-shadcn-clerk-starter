import {
  db,
  eq,
  Posts,
  Categories,
  PostCategories,
  Views,
  Likes,
  sql,
} from "astro:db";

export async function getPostBySlug(slug: string) {
  const posts = await db.select().from(Posts).where(eq(Posts.slug, slug));
  return posts[0];
}

export async function getCategoriesForPost(postId: number) {
  const categories = await db
    .select()
    .from(PostCategories)
    .innerJoin(Categories, eq(Categories.id, PostCategories.categoryId))
    .where(eq(PostCategories.postId, postId));

  return categories.map((c) => ({
    name: c.Categories.name,
    slug: c.Categories.slug,
  }));
}

export async function getViewCount(postId: number) {
  const result = await db
    .select({ count: sql`count(*)` })
    .from(Views)
    .where(eq(Views.postId, postId));
  return Number(result[0].count);
}

export async function getLikeCount(postId: number) {
  const result = await db
    .select({ count: sql`count(*)` })
    .from(Likes)
    .where(eq(Likes.postId, postId));
  return Number(result[0].count);
}

export async function addView(postId: number) {
  await db.insert(Views).values({ postId, viewedAt: new Date() });
}
