"use client";

import { PaintingT } from "@/app/lib/data";
import { useSwipeable } from "react-swipeable";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export const PaintingOverlay = ({
  painting,
  children,
  goToPrevPainting,
  goToNextPainting,
  onOverlayClose,
}: {
  painting: PaintingT;
  children: React.ReactNode;
  goToPrevPainting: () => void;
  goToNextPainting: () => void;
  onOverlayClose: () => void;
}) => {
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
            <button
              className="p-2 text-2xl opacity-75 cursor-pointer sm:p-6 md:p-5 hover:bg-opacity-30 hover:bg-gray-500 hover:rounded-3xl flex justify-center "
              onClick={onOverlayClose}
            >
              <XMarkIcon className="h-12 w-12 text-white" />
            </button>
          </div>
        </div>
        <div className="row-span-7" {...handlers}>
          <div className="grid grid-cols-6 h-full">
            <div className="hidden md:flex md:flex-col md:justify-around col-span-1">
              <button
                className="text-2xl opacity-75 cursor-pointer lg:p-5 xl:px-10 xl:py-16 hover:bg-opacity-30 hover:bg-gray-500 hover:rounded-3xl flex justify-center "
                onClick={() => {
                  goToPrevPainting();
                }}
              >
                <ChevronLeftIcon className="h-12 w-12 text-white" />
              </button>
            </div>
            <div className="col-span-6 md:col-span-4 flex justify-center">
              <div className="relative">
                {/* children should be a single next Image component */}
                {children}
              </div>
            </div>
            <div className="hidden md:flex md:flex-col md:justify-around col-span-1">
              <button
                className="text-2xl opacity-75 cursor-pointer hover:bg-opacity-30 hover:bg-gray-500 hover:rounded-3xl flex justify-center lg:p-5 xl:px-10 xl:py-16"
                onClick={() => {
                  goToNextPainting();
                }}
              >
                <ChevronRightIcon className="h-12 w-12 text-white" />
              </button>
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
