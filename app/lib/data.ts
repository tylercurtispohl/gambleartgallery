import { createClient } from "@sanity/client";
import {
  SanityAboutContent,
  SanityCategory,
  SanityPainting,
} from "@/app/lib/types";

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

  const paintings = (await configuredSanityClient.fetch(
    query
  )) as SanityPainting[];

  return paintings;
};

export const fetchCategories = async (): Promise<SanityCategory[]> => {
  const categories = await configuredSanityClient.fetch(
    `*[_type == "category"]`
  );

  return categories as SanityCategory[];
};

export const fetchAboutPageContent = async (): Promise<SanityAboutContent> => {
  const query = `*[_type == "about"]`;
  const docs = await configuredSanityClient.fetch(query);

  // This is returned as an array but there should only ever be one item
  return docs[0] as SanityAboutContent;
};
