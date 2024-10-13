"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface imageSliderProps {
  images: string[];
}

export const ImageSlider = ({ images }: imageSliderProps) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrevieusClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className="grid gap-5 md:gap-5 items-start">
      <div className="relative overflow-hidden rounded-lg w-full h-96 aspect-w-1 aspect-h-1 border">
        <Image
          src={images[mainImageIndex]}
          fill
          alt="Product Image"
          className="object-contain w-full h-full"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePrevieusClick} variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button onClick={handleNextClick} variant="ghost" size="icon">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              "relative aspect-w-1 aspect-h-1 border rounded-lg",
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
