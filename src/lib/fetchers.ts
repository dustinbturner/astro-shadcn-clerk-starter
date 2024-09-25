import { getCollection } from "astro:content";

export async function getCategories() {
  const posts = await getCollection("blog");
  const categories = [
    ...new Set(
      posts
        .map(
          (post: { data: { category: string | string[] } }) =>
            post.data.category
        )
        .flat()
    ),
  ];

  return categories;
}

export async function getPosts() {
  const posts = (await getCollection("blog")).sort(
    (a: { data: { pubDate: Date } }, b: { data: { pubDate: Date } }) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return posts;
}

export async function getPostsByCategory(category: string) {
  const posts = (await getCollection("blog"))
    .filter((post: { data: { category: string | string[] } }) =>
      post.data.category.includes(category)
    )
    .sort(
      (a: { data: { pubDate: Date } }, b: { data: { pubDate: Date } }) =>
        b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

  return posts;
}

export async function getGuides() {
  const guides = await getCollection("guides");
  return guides
    .filter(
      (guide: { data: { published: boolean; pubDate: Date } }) =>
        guide.data.published
    )
    .sort(
      (a: { data: { pubDate: Date } }, b: { data: { pubDate: Date } }) =>
        b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );
}
