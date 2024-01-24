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

export const PaintingOverlay = ({
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
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextPainting(),
    onSwipedRight: () => goToPrevPainting(),
    trackMouse: true,
  });
  return (
    <div className="fixed top-0 right-0 z-50 flex justify-around w-full h-full bg-black bg-opacity-95">
      <div
        className="grid grid-rows-9 justify-between w-full h-full text-center text-white md:px-2 lg:px-10 xl:px-16 2xl:px-8 3xl:px-0 2xl:py-2 3xl:py-4 lg:w-11/12 2xl:w-4/5 3xl:w-3/4 4xl:w-3/5 6xl:w-1/2"
        {...handlers}
      >
        <div className="flex justify-end md:justify-around row-span-1">
          <div className="hidden md:block md:w-1/12 xl:w-1/6"></div>
          <div className="hidden md:block md:w-10/12 xl:w-4/6"></div>
          <div className="flex justify-center md:w-1/12 xl:w-1/6 ">
            <button
              className="p-2 text-2xl opacity-75 cursor-pointer sm:p-6 md:p-5"
              onClick={() => {
                setIsOverlayOpen(false);
              }}
            >
              <XMarkIcon className="h-12 w-12" />
            </button>
          </div>
        </div>
        {/* <div className="flex justify-around">
          <div className="hidden md:flex md:flex-col md:justify-around md:w-1/12 xl:w-1/6">
            <button
              className="text-2xl opacity-75 cursor-pointer lg:p-5 xl:px-10 xl:py-16"
              onClick={() => {
                goToPrevPainting();
              }}
            >
              <ChevronLeftIcon className="h-12 w-12" />
            </button>
          </div>
          <div className="flex flex-col justify-around w-full md:w-10/12 xl:w-4/6">
            <div className="flex justify-around">
              <div className="relative block lg:h-12/16 xl:h-13/16">
                <Image
                  {...imageProps}
                  height={500}
                  width={500}
                  className="object-contain h-full w-full"
                  alt={painting.name}
                />
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:flex-col md:justify-around md:w-1/12 xl:w-1/6">
            <button
              className="text-2xl opacity-75 cursor-pointer lg:p-5 xl:px-10 xl:py-16"
              onClick={() => {
                goToNextPainting();
              }}
            >
              <ChevronRightIcon className="h-12 w-12" />
            </button>
          </div>
        </div> */}
        <div className="grid grid-cols-6 row-span-7">
          <div className="hidden md:flex md:flex-col md:justify-around col-span-1">
            <button
              className="text-2xl opacity-75 cursor-pointer lg:p-5 xl:px-10 xl:py-16 flex justify-end"
              onClick={() => {
                goToPrevPainting();
              }}
            >
              <ChevronLeftIcon className="h-12 w-12" />
            </button>
          </div>
          {/* <div className="flex flex-col justify-around col-span-6 md:col-span-4">
            <div className="flex justify-around">
              <div className="relative block w-full h-full">
                <Image
                  {...imageProps}
                  className="object-contain"
                  alt={painting.name}
                />
              </div>
            </div>
          </div> */}
          <div className="col-span-6 md:col-span-4 h-full">
            <Image
              {...imageProps}
              height={500}
              width={500}
              className="object-contain"
              alt={painting.name}
            />
          </div>
          <div className="hidden md:flex md:flex-col md:justify-around col-span-1">
            <button
              className="text-2xl opacity-75 cursor-pointer lg:p-5 xl:px-10 xl:py-16"
              onClick={() => {
                goToNextPainting();
              }}
            >
              <ChevronRightIcon className="h-12 w-12" />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start font-serif row-span-1">
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
