"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="space-y-4">

      <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">

        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${
              selectedIndex === index
                ? "border-black"
                : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`${title} image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}