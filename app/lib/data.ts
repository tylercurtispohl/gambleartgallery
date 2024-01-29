import { createClient } from "@sanity/client";
import {
  SanityAboutContent,
  SanityCategory,
  SanityEvent,
  SanityPainting,
} from "@/app/lib/types";
import { sortBy } from "lodash";

export const configuredSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-25",
});

export const fetchPaintings = async (
  categoryId?: string | undefined
): Promise<SanityPainting[]> => {
  const categoryQuery = categoryId
    ? ` && category._ref == "${categoryId}"`
    : "";
  const query = `*[_type == "painting"${categoryQuery}]`;

  const paintings = await configuredSanityClient.fetch<SanityPainting[]>(
    query,
    {},
    {
      next: {
        tags: ["painting"],
      },
    }
  );

  const sortedPaintings = sortBy(paintings, (p) => p.sortOrder);

  return sortedPaintings;
};

export const fetchCategories = async (): Promise<SanityCategory[]> => {
  return await configuredSanityClient.fetch<SanityCategory[]>(
    `*[_type == "category"]`,
    {},
    {
      next: {
        tags: ["category"],
      },
    }
  );
};

export const fetchAboutPageContent = async (): Promise<SanityAboutContent> => {
  const query = `*[_type == "about"]`;
  const docs = await configuredSanityClient.fetch<SanityAboutContent[]>(
    query,
    {},
    {
      next: {
        tags: ["about"],
      },
    }
  );

  // This is returned as an array but there should only ever be one item
  return docs[0];
};

export const fetchEvents = async (): Promise<SanityEvent[]> => {
  return await configuredSanityClient.fetch<SanityEvent[]>(
    `*[_type == "event"]`,
    {},
    {
      next: {
        tags: ["event"],
      },
    }
  );
};
