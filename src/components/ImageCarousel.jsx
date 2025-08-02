import React from "react";
import useImageCarousel from "../hooks/useImageCarousel";

const ImageCarousel = ({ images }) => {
  const { showImage, nextImage, prevImage, currentIndex } = useImageCarousel();
  return (
    <div className="carousel-container">
      <div className="thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index}`}
            onClick={() => showImage(index)}
            className={currentIndex === index ? "active" : ""}
          />
        ))}
        <a href="#image-gallery">
          <div className="more-thumbnail">Ver más</div>
        </a>
      </div>

      <div className="main-image">
        <img src={images[currentIndex]} alt="Principal" />
        <button className="arrow left" onClick={prevImage}>
          ❮
        </button>
        <button className="arrow right" onClick={nextImage}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
