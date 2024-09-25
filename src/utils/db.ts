import {
  db,
  eq,
  Posts,
  Categories,
  PostCategories,
  Views,
  Likes,
} from "astro:db";

export async function getPostBySlug(slug: string) {
  const posts = await db
    .select()
    .from(Posts)
    .where(eq(Posts.columns.slug, slug));
  return posts[0];
}

export async function getCategoriesForPost(postId: number) {
  const categories = await db
    .select()
    .from(PostCategories)
    .innerJoin(
      Categories,
      eq(Categories.columns.id, PostCategories.columns.categoryId)
    )
    .where(eq(PostCategories.columns.postId, postId));

  return categories.map((c) => ({ name: c.name, slug: c.slug }));
}

export async function getViewCount(postId: number) {
  const result = await db
    .select({ count: db.fn.count() })
    .from(Views)
    .where(eq(Views.columns.postId, postId));
  return Number(result[0].count);
}

export async function getLikeCount(postId: number) {
  const result = await db
    .select({ count: db.fn.count() })
    .from(Likes)
    .where(eq(Likes.columns.postId, postId));
  return Number(result[0].count);
}

export async function addView(postId: number) {
  await db.insert(Views).values({ postId, viewedAt: new Date() });
}
