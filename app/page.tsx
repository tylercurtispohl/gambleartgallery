import { PaintingT, fetchCategories, fetchPaintings } from "@/app/lib/data";
import { Painting } from "@/app/ui/gallery/painting";
import { Filter } from "@/app/ui/gallery/filter";

const getBuckets = (paintings: PaintingT[], numBuckets: number) => {
  const buckets: PaintingT[][] = [];

  for (let i = 0; i < numBuckets; i++) {
    buckets[i] = [];
  }
  let bucketIndex = 0;

  for (let i = 0; i < paintings.length; i++) {
    buckets[bucketIndex].push(paintings[i]);

    if (bucketIndex === buckets.length - 1) {
      bucketIndex = 0;
    } else {
      bucketIndex++;
    }
  }

  return buckets;
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { categoryId: string };
}) {
  console.log(searchParams);
  const paintingPromise = fetchPaintings(searchParams?.categoryId);
  const categoryPromise = fetchCategories();

  const [paintings, categories] = await Promise.all([
    paintingPromise,
    categoryPromise,
  ]);

  const fourBuckets = getBuckets(paintings, 4);
  const threeBuckets = getBuckets(paintings, 3);
  const twoBuckets = getBuckets(paintings, 2);

  return (
    <main>
      <Filter categories={categories} />
      <div className="flex justify-center md:px-2">
        <div className="w-full xl:w-5/6">
          {/* Four columns on large screens */}
          <div className="hidden lg:grid grid-cols-4 gap-2">
            {fourBuckets.map((bucket, bucketIndex) => (
              <div
                key={`painting_bucket_${bucketIndex}`}
                className="flex flex-col gap-2"
              >
                {bucket.map((p) => (
                  <Painting
                    key={`painting_${p._id}`}
                    painting={p}
                    className=""
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Three columns on medium screens */}
          <div className="hidden md:grid grid-cols-3 gap-2 lg:hidden">
            {threeBuckets.map((bucket, bucketIndex) => (
              <div
                key={`painting_bucket_${bucketIndex}`}
                className="flex flex-col gap-2"
              >
                {bucket.map((p) => (
                  <Painting
                    key={`painting_${p._id}`}
                    painting={p}
                    className=""
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Two columns on small screens and one column on extra small screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden">
            {twoBuckets.map((bucket, bucketIndex) => (
              <div
                key={`painting_bucket_${bucketIndex}`}
                className="flex flex-col gap-2"
              >
                {bucket.map((p) => (
                  <Painting
                    key={`painting_${p._id}`}
                    painting={p}
                    className=""
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
