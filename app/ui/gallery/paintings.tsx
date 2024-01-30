"use client";

import { SanityPainting } from "@/app/lib/types";
import { useCallback, useState } from "react";
import { Painting } from "./painting";
import { PaintingOverlay } from "./paintingOverlay";
import { usePaintingImageMap } from "./usePaintingImageMap";

// Split the list of paintings into "buckets" or columns
const getBuckets = (paintings: SanityPainting[], numBuckets: number) => {
  const buckets: SanityPainting[][] = [];

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

export const Paintings = (props: { paintings: SanityPainting[] }) => {
  const { paintings } = props;

  // Organize the paintings for different screen configurations
  const fourBuckets = getBuckets(paintings, 4);
  const threeBuckets = getBuckets(paintings, 3);
  const twoBuckets = getBuckets(paintings, 2);

  const [expandedPainting, setExpandedPainting] = useState<
    SanityPainting | null | undefined
  >();

  const goToPrevPainting = useCallback(() => {
    if (!expandedPainting) return;

    const index = paintings.findIndex((p) => p._id === expandedPainting._id);

    if (index !== null && typeof index !== "undefined") {
      const prevPainting =
        index === 0 ? paintings[paintings.length - 1] : paintings[index - 1];
      setExpandedPainting(prevPainting);
    }
  }, [paintings, expandedPainting]);

  const goToNextPainting = useCallback(() => {
    if (!expandedPainting) return;

    const index = paintings.findIndex((p) => p._id === expandedPainting._id);

    if (index !== null && typeof index !== "undefined") {
      const nextPainting =
        index === paintings.length - 1 ? paintings[0] : paintings[index + 1];
      setExpandedPainting(nextPainting);
    }
  }, [paintings, expandedPainting]);

  const paintingImageMap = usePaintingImageMap(paintings);

  return (
    <>
      {expandedPainting && (
        <PaintingOverlay
          painting={expandedPainting}
          goToNextPainting={goToNextPainting}
          goToPrevPainting={goToPrevPainting}
          onOverlayClose={() => {
            setExpandedPainting(null);
            document.body.classList.remove("overflow-hidden");
          }}
        >
          {paintingImageMap.get(expandedPainting._id)}
        </PaintingOverlay>
      )}
      <div className="w-full">
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
                  onClick={() => {
                    setExpandedPainting(p);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  {paintingImageMap.get(p._id)}
                </Painting>
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
                  onClick={() => {
                    setExpandedPainting(p);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  {paintingImageMap.get(p._id)}
                </Painting>
              ))}
            </div>
          ))}
        </div>
        {/* Two columns on small screens */}
        <div className="sm:grid hidden sm:grid-cols-2 gap-2 md:hidden">
          {twoBuckets.map((bucket, bucketIndex) => (
            <div
              key={`painting_bucket_${bucketIndex}`}
              className="flex flex-col gap-4"
            >
              {bucket.map((p) => (
                <Painting
                  key={`painting_${p._id}`}
                  painting={p}
                  className=""
                  onClick={() => {
                    setExpandedPainting(p);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  {paintingImageMap.get(p._id)}
                </Painting>
              ))}
            </div>
          ))}
        </div>
        {/* One column on extra small screens */}
        <div className="flex flex-col gap-4 sm:hidden">
          {paintings.map((p) => (
            <Painting
              key={`painting_${p._id}`}
              painting={p}
              className=""
              onClick={() => {
                setExpandedPainting(p);
                document.body.classList.add("overflow-hidden");
              }}
            >
              {paintingImageMap.get(p._id)}
            </Painting>
          ))}
        </div>
      </div>
    </>
  );
};
