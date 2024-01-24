"use client";

import { PaintingT, configuredSanityClient } from "@/app/lib/data";
import { ReactNode, useCallback, useState } from "react";
import Image from "next/image";
import { PaintingV2 } from "./paintingV2";
import { PaintingOverlayV3 } from "./paintingOverlayV3";
import {
  ImageUrlBuilder,
  UseNextSanityImageBuilderOptions,
  useNextSanityImage,
} from "next-sanity-image";

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

const myCustomImageBuilder = (
  imageUrlBuilder: ImageUrlBuilder,
  options: UseNextSanityImageBuilderOptions
) => {
  return imageUrlBuilder
    .width(
      options.width || Math.min(options.originalImageDimensions.width, 800)
    )
    .quality(70)
    .fit("clip");
};

const PaintingImage = ({
  name,
  asset,
}: {
  name: string;
  asset: { _ref: string };
}) => {
  const imageProps = useNextSanityImage(configuredSanityClient, asset, {
    imageBuilder: myCustomImageBuilder,
  });

  return (
    <Image
      {...imageProps}
      // width={300}
      // height={300}
      alt={name}
      width="0"
      height="0"
      sizes="(max-width: 640px) 60vw, (max-width: 1280px) 40vw, 10vw"
      className="w-full h-full object-contain"
    />
  );
};

const usePaintingImageMap = (paintings: PaintingT[]) => {
  return new Map<string, ReactNode>(
    paintings.map((p) => [
      p._id,
      <PaintingImage
        key={`painting_image_${p._id}`}
        name={p.name}
        asset={p.image.asset}
      />,
    ])
  );
};

export const Paintings = (props: { paintings: PaintingT[] }) => {
  const { paintings } = props;
  const fourBuckets = getBuckets(paintings, 4);
  const threeBuckets = getBuckets(paintings, 3);
  const twoBuckets = getBuckets(paintings, 2);

  const [expandedPainting, setExpandedPainting] = useState<
    PaintingT | null | undefined
  >();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentExpandedPaintingId, setCurrentExpandedPaintingId] = useState<
    string | null
  >(null);

  const goToPrevPainting = useCallback(() => {
    if (!expandedPainting) return;
    // const index = paintings.findIndex(
    //   (p) => p._id === currentExpandedPaintingId
    // );
    const index = paintings.findIndex((p) => p._id === expandedPainting._id);

    if (index !== null && typeof index !== "undefined") {
      // const newId =
      //   index === 0
      //     ? paintings[paintings.length - 1]._id
      //     : paintings[index - 1]._id;

      // setCurrentExpandedPaintingId(newId);
      const prevPainting =
        index === 0 ? paintings[paintings.length - 1] : paintings[index - 1];
      setExpandedPainting(prevPainting);
    }
  }, [paintings, expandedPainting]);

  const goToNextPainting = useCallback(() => {
    if (!expandedPainting) return;

    // const index = paintings.findIndex(
    //   (p) => p._id === currentExpandedPaintingId
    // );
    const index = paintings.findIndex((p) => p._id === expandedPainting._id);

    if (index !== null && typeof index !== "undefined") {
      // const newId =
      //   index === paintings.length - 1
      //     ? paintings[0]._id
      //     : paintings[index + 1]._id;

      // setCurrentExpandedPaintingId(newId);
      const nextPainting =
        index === paintings.length - 1 ? paintings[0] : paintings[index + 1];
      setExpandedPainting(nextPainting);
    }
  }, [paintings, expandedPainting]);

  const paintingImageMap = usePaintingImageMap(paintings);

  return (
    <>
      {expandedPainting && (
        <PaintingOverlayV3
          painting={expandedPainting}
          goToNextPainting={goToNextPainting}
          goToPrevPainting={goToPrevPainting}
          onOverlayClose={() => {
            console.log("onOverlayClose function called");
            setExpandedPainting(null);
            document.body.classList.remove("overflow-hidden");
          }}
        >
          {paintingImageMap.get(expandedPainting._id)}
        </PaintingOverlayV3>
      )}
      <div className="w-full xl:w-5/6">
        {/* Four columns on large screens */}
        <div className="hidden lg:grid grid-cols-4 gap-2">
          {fourBuckets.map((bucket, bucketIndex) => (
            <div
              key={`painting_bucket_${bucketIndex}`}
              className="flex flex-col gap-2"
            >
              {bucket.map((p) => (
                <PaintingV2
                  key={`painting_${p._id}`}
                  painting={p}
                  className=""
                  onClick={() => {
                    setExpandedPainting(p);
                    setIsModalOpen(true);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  {paintingImageMap.get(p._id)}
                </PaintingV2>
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
                <PaintingV2
                  key={`painting_${p._id}`}
                  painting={p}
                  className=""
                  onClick={() => {
                    setExpandedPainting(p);
                    setIsModalOpen(true);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  {paintingImageMap.get(p._id)}
                </PaintingV2>
              ))}
            </div>
          ))}
        </div>
        {/* Two columns on small screens and one column on extra small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden px-4">
          {twoBuckets.map((bucket, bucketIndex) => (
            <div
              key={`painting_bucket_${bucketIndex}`}
              className="flex flex-col gap-4"
            >
              {bucket.map((p) => (
                <PaintingV2
                  key={`painting_${p._id}`}
                  painting={p}
                  className=""
                  onClick={() => {
                    setExpandedPainting(p);
                    setIsModalOpen(true);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  {paintingImageMap.get(p._id)}
                </PaintingV2>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
