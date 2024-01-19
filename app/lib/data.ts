import { createClient } from "@sanity/client";

export const configuredSanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-25",
});

export const fetchPaintings = async () => {
  const paintings = await configuredSanityClient.fetch(
    `*[_type == "painting"]`
  );

  console.log(paintings);

  return paintings;
};
