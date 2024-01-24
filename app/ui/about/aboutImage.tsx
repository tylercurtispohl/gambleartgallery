"use client";

import { configuredSanityClient } from "@/app/lib/data";
import { SanityRef } from "@/app/lib/types";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

export const AboutImage = ({ asset }: { asset: SanityRef }) => {
  const imageProps = useNextSanityImage(configuredSanityClient, asset);

  return (
    <div className="block relative rounded-full overflow-hidden h-80 w-80 xl:h-96 xl:w-96">
      <Image
        {...imageProps}
        width={500}
        height={500}
        alt="Kirsten Gamble's Bio Picture"
      />
    </div>
  );
};
