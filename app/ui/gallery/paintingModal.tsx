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
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const PaintingModal = ({
  painting,
  goToPrevPainting,
  goToNextPainting,
  isOpen,
  onClose,
}: {
  painting: PaintingT;
  goToPrevPainting: () => void;
  goToNextPainting: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const imageProps = useNextSanityImage(configuredSanityClient, painting.image);
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextPainting(),
    onSwipedRight: () => goToPrevPainting(),
    trackMouse: true,
  });

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      className="bg-transparent text-white"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      closeButton={
        <Button variant="light">
          <XMarkIcon className="h-12 w-12 text-white font-bold" />
        </Button>
      }
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* <ModalHeader>{painting.name}</ModalHeader> */}
            <ModalBody>
              <div className="flex justify-center">
                <Image
                  {...imageProps}
                  height={500}
                  width={500}
                  alt={painting.name}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col text-center">
              <p className="text-base tracking-wider lg:text-lg">
                {painting.name}
              </p>
              {painting.width && painting.height && (
                <p className="text-sm lg:text-base">
                  {painting.width} x {painting.height}
                </p>
              )}
              {!painting.isSold && painting.price && (
                <p className="text-sm lg:text-base">${painting.price}</p>
              )}
              {painting.isSold && <p className="text-sm lg:text-base">SOLD</p>}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
