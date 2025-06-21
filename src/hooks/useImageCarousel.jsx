import React, { useState } from "react";

const useImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/src/assets/torre_eiffel.jpg",
    "/src/assets/asakusa.webp",
    "/src/assets/pertenon.jpg",
    "/src/assets/yucatan.jpg",
  ];

  const showImage = (index) => {
    setCurrentIndex(index);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };
  return {
    showImage,
    nextImage,
    prevImage,
    images,
    currentIndex,
  };
};

export default useImageCarousel;
