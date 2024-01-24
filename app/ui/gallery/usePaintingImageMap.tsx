import { PaintingT, configuredSanityClient } from "@/app/lib/data";
import { ReactNode } from "react";
import Image from "next/image";
import {
  ImageUrlBuilder,
  UseNextSanityImageBuilderOptions,
  useNextSanityImage,
} from "next-sanity-image";

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

  // Even though I didn't use the package mentioned in this article, it helped me
  // understand the sizes property of the Next Image component
  // https://www.linkedin.com/pulse/really-good-image-optimisation-nextjs-sanity-jonathan-alford/
  return (
    <Image
      {...imageProps}
      alt={name}
      width="0"
      height="0"
      sizes="(max-width: 640px) 60vw, (max-width: 1280px) 40vw, 10vw"
      className="w-full h-full object-contain"
    />
  );
};

export const usePaintingImageMap = (paintings: PaintingT[]) => {
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
