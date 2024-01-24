"use client";

import Image from "next/image";
import { PaintingT, configuredSanityClient } from "@/app/lib/data";
import { useNextSanityImage } from "next-sanity-image";
import { clsx } from "clsx";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

export const PaintingV2 = ({
  painting,
  children,
  className,
  onClick,
}: {
  painting: PaintingT;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const imageProps = useNextSanityImage(configuredSanityClient, painting.image);

  return (
    <div
      className={clsx(
        "relative z-0 cursor-pointer flex justify-center",
        className,
        { "cursor-pointer": !!onClick }
      )}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {/* <Image {...imageProps} width={300} height={300} alt={painting.name} /> */}
      <div className="w-full">{children}</div>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col h-full p-2 font-serif font-medium tracking-wide text-white transition ease-in-out bg-gray-700 bg-opacity-50 opacity-0 hover-hover:hover:opacity-100 duration-400">
        <div className="p-3 text-2xl text-right cursor-pointer">
          <button
            onClick={() => {
              onClick && onClick();
            }}
          >
            <ArrowsPointingOutIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-auto leading-5 text-center break-words">
          {painting.name}
        </div>
        {painting.width && painting.height && (
          <div className="leading-5 text-center">
            {painting.width} x {painting.height}
          </div>
        )}
        {!painting.isSold && painting.price && (
          <div className="leading-5 text-center">${painting.price}</div>
        )}
        {painting.isSold && <div className="leading-5 text-center">SOLD</div>}
      </div>
    </div>
  );
};
