import { fetchCategories, fetchPaintings } from "@/app/lib/data";
import { Filter } from "@/app/ui/gallery/filter";
import { Paintings } from "@/app/ui/gallery/paintings";

export default async function Page({
  searchParams,
}: {
  searchParams?: { categoryId: string };
}) {
  const paintingPromise = fetchPaintings(searchParams?.categoryId);
  const categoryPromise = fetchCategories();

  const [paintings, categories] = await Promise.all([
    paintingPromise,
    categoryPromise,
  ]);

  return (
    <>
      <Filter categories={categories} />
      <Paintings paintings={paintings} />
    </>
  );
}
