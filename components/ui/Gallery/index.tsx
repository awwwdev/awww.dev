'use client';
import { useMemo, useState } from "react";
import Button from "../button";
import Icon from "../Icon";
import Image from "next/image";

type Image = {
  src: string;
  alt: string;
  imgObject: any;
};

export default function Gallery({ images }: { images: Image[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = useMemo(() => images[currentImageIndex], [currentImageIndex]);
  return (
    <div>
      <div className="w-full  rd-3 p-3 bg-gradient-radial from-base4 via-base3 to-base2  b-base4 b-1 grid">
        <div
          className="flex items-center justify-center w-full !aspect-ratio-16/9 max-h-100  "
          style={{ gridArea: "1/1/-1/-1" }}
        >
          <Image
            src={currentImage.imgObject ?? currentImage.src}
            alt={currentImage.alt}
            className="min-w-0 max-h-full max-w-full  object-contain "
            />
            </div>
        {images.length > 1 && (
          <div style={{ gridArea: "1/1/-1/-1" }} className="flex items-center p-1 ">
            <Button
              iconButton
              variation="soft"
              className=" text-xs "
              onClick={() => {
                setCurrentImageIndex((s) => (s - 1 + images.length) % images.length);
              }}
            >
              <Icon name="bf-i-ph-arrow-left" className="" />
            </Button>
          </div>
        )}
        {images.length > 1 && (
          <div style={{ gridArea: "1/1/-1/-1" }} className="flex items-center justify-end p-1">
            <Button
              iconButton
              variation="soft"
              className=" text-xs"
              onClick={() => {
                setCurrentImageIndex((s) => (s + 1) % images.length);
              }}
            >
              <Icon name="bf-i-ph-arrow-right" className="" />
            </Button>
          </div>
        )}
      </div>

      {images && images.length > 1 && (
        <>
          <div className="h-6"></div>
          <ul className="flex gap-3 justify-center overflow-auto ">
            {images.map((image, index) => {
              return (
                <li key={`gallery-image-${index}`}>
                  <button
                    onClick={() => {
                      setCurrentImageIndex(index);
                    }}
                    className="block"
                  >
                    <Image
                      key={`image-work-${index}`}
                      src={image.imgObject ?? image.src}
                      alt=""
                      className={`w-40 h-20 min-w-0 rd-1.5 shadow-xl object-cover 
                      ${currentImageIndex === index ? " grayscale-0" : "grayscale-100"}
                      hover:grayscale-0
                      `}
                      style={{
                        // transition: 'filter 300s ease',
                        objectPosition: "top center",
                      }}
                    />
                    <div className="p-1">
                      <div
                        className={`h-1 rd-full ${currentImageIndex === index ? "bg-accent9" : "bg-transparent"}`}
                      ></div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
