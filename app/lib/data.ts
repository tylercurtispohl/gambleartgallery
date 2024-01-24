import { createClient } from "@sanity/client";

export type PaintingT = {
  name: string;
  _updateAt: Date;
  height: number;
  image: {
    asset: {
      _ref: string;
    };
  };
  price: number;
  sortOrder: number;
  width: number;
  _id: string;
  category: {
    _ref: string;
  };
  _createdAt: Date;
  isSold: boolean;
};

export type CategoryT = {
  _id: string;
  name: string;
};

export const configuredSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-25",
});

export const fetchPaintings = async (
  categoryId?: string | undefined
): Promise<PaintingT[]> => {
  const categoryQuery = categoryId
    ? ` && category._ref == "${categoryId}"`
    : "";
  const query = `*[_type == "painting"${categoryQuery}]`;

  const paintings = (await configuredSanityClient.fetch(query)) as PaintingT[];

  return paintings;
};

export const fetchCategories = async (): Promise<CategoryT[]> => {
  const categories = await configuredSanityClient.fetch(
    `*[_type == "category"]`
  );

  return categories as CategoryT[];
};
