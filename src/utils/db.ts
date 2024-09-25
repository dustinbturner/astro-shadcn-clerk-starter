import {
  db,
  eq,
  and,
  Posts,
  Categories,
  PostCategories,
  Views,
  Likes,
  sql,
} from "astro:db";

export async function getAllPosts() {
  return db
    .select()
    .from(Posts)
    .orderBy(sql`${Posts.createdAt} DESC`);
}

export async function getPostBySlug(slug: string) {
  const post = await db
    .select()
    .from(Posts)
    .where(eq(Posts.slug, slug))
    .limit(1)
    .then((posts) => posts[0]);
  return post || null;
}

export async function getCategoriesForPost(postId: number) {
  const postCategories = await db
    .select()
    .from(PostCategories)
    .innerJoin(Categories, eq(Categories.id, PostCategories.categoryId))
    .where(eq(PostCategories.postId, postId));

  return postCategories.map((pc) => pc.Categories);
}

export async function getViewCount(postId: number) {
  const result = await db
    .select({ count: sql`COUNT(${Views.id})` })
    .from(Views)
    .where(eq(Views.postId, postId));
  return Number(result[0].count);
}

export async function getLikeCount(postId: number) {
  const result = await db
    .select({ count: sql`COUNT(${Likes.id})` })
    .from(Likes)
    .where(eq(Likes.postId, postId));
  return Number(result[0].count);
}

export async function addView(postId: number) {
  await db.insert(Views).values({ postId, viewedAt: new Date() });
}

export async function addLike(postId: number, userId: string) {
  await db.insert(Likes).values({ postId, userId, likedAt: new Date() });
}

export async function removeLike(postId: number, userId: string) {
  await db
    .delete(Likes)
    .where(and(eq(Likes.postId, postId), eq(Likes.userId, userId)));
}
