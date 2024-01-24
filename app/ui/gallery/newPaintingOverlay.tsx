"use client";

import { PaintingT, configuredSanityClient } from "@/app/lib/data";
import { useNextSanityImage } from "next-sanity-image";
import { useSwipeable } from "react-swipeable";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(configuredSanityClient);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const NewPaintingOverlay = ({
  painting,
  goToPrevPainting,
  goToNextPainting,
  setIsOverlayOpen,
}: {
  painting: PaintingT;
  goToPrevPainting: () => void;
  goToNextPainting: () => void;
  setIsOverlayOpen: (value: boolean) => void;
}) => {
  const imageProps = useNextSanityImage(configuredSanityClient, painting.image);
  console.log(painting.image);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextPainting(),
    onSwipedRight: () => goToPrevPainting(),
    trackMouse: true,
  });

  return (
    <div className="flex justify-center fixed top-0 right-0 z-50 w-full h-full bg-black bg-opacity-95">
      <div className="grid grid-rows-9 h-full w-full lg:w-11/12 2xl:w-4/5 3xl:w-3/4 4xl:w-3/5 6xl:w-1/2 md:px-2 py-2">
        <div className="row-span-1 grid grid-cols-6">
          <div className="flex flex-col justify-around col-start-6 col-span-1">
            <Button
              variant="light"
              size="lg"
              onPress={() => {
                setIsOverlayOpen(false);
              }}
            >
              <XMarkIcon className="h-12 w-12 text-white" />
            </Button>
          </div>
        </div>
        <div className="row-span-7">
          <div className="grid grid-cols-6 h-full">
            <div className="hidden md:flex md:flex-col md:justify-around col-span-1">
              <Button variant="light" size="lg" onPress={goToPrevPainting}>
                <ChevronLeftIcon className="h-12 w-12 text-white" />
              </Button>
            </div>
            <div className="col-span-6 md:col-span-4 flex justify-center">
              <div className="relative h-full w-full">
                <Image
                  src={urlFor(painting.image).url()}
                  fill
                  // height={500}
                  // width={500}
                  // sizes="(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px"
                  className="object-contain"
                  alt={painting.name}
                />
              </div>
            </div>
            <div className="hidden md:flex md:flex-col md:justify-around col-span-1">
              <Button variant="light" size="lg" onPress={goToNextPainting}>
                <ChevronRightIcon className="h-12 w-12 text-white" />
              </Button>
            </div>
          </div>
        </div>
        <div className="row-span-2 text-white text-center">
          <p className="text-base tracking-wider lg:text-lg">{painting.name}</p>
          {painting.width && painting.height && (
            <p className="text-sm lg:text-base">
              {painting.width} x {painting.height}
            </p>
          )}
          {!painting.isSold && painting.price && (
            <p className="text-sm lg:text-base">${painting.price}</p>
          )}
          {painting.isSold && <p className="text-sm lg:text-base">SOLD</p>}
        </div>
      </div>
    </div>
  );
};
