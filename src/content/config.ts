import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    cover: z.string(),
    category: z.string(),
  }),
});

const docs = defineCollection({
  type: "content", // Add this line
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string().optional(),
    order: z.number().optional(),
  }),
});

const guides = defineCollection({
  type: "content", // Add this line
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    pubDate: z.date(),
    author: z.string().optional(),
  }),
});

const releases = defineCollection({
  type: "content", // Add this line
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      versionNumber: z.string(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      date: z.date(),
    }),
});

export const collections = { blog, docs, guides, releases };
