"use client";

import Image from "next/image";
import { PaintingT, configuredSanityClient } from "@/app/lib/data";
import { useNextSanityImage } from "next-sanity-image";
import { clsx } from "clsx";

export const Painting = (props: {
  painting: PaintingT;
  className?: string;
}) => {
  const { painting, className } = props;

  const imageProps = useNextSanityImage(configuredSanityClient, painting.image);

  return (
    <div
      className={clsx(
        "relative z-0 cursor-pointer flex justify-center",
        className
      )}
    >
      <Image {...imageProps} width={300} height={300} alt={painting.name} />
    </div>
  );
};
