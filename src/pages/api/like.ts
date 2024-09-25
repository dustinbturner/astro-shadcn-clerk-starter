import type { APIRoute } from "astro";
import { db, Likes } from "astro:db";

export const post: APIRoute = async ({ request }) => {
  const { slug, userId, action } = await request.json();

  try {
    if (action === "add") {
      await db.insert(Likes).values({ slug, userId });
    } else if (action === "remove") {
      await db.delete(Likes).where({ slug, userId });
    }

    const hasLiked = await db
      .select()
      .from(Likes)
      .where({ slug, userId })
      .exists();

    return new Response(JSON.stringify({ success: true, hasLiked }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
};

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const userId = url.searchParams.get("userId");

  if (!slug || !userId) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing slug or userId" }),
      { status: 400 }
    );
  }

  try {
    const hasLiked = await db
      .select()
      .from(Likes)
      .where({ slug, userId })
      .exists();
    return new Response(JSON.stringify({ success: true, hasLiked }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
};

export async function POST(request: Request) {
  try {
    const { postId, userId } = await request.json();

    await db.insert(Likes).values({
      // other fields...
      likedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
}
