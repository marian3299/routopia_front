import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import TourDescription from "../components/TourDescription";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useTourDetail from "../hooks/useTourDetail";

const TourDetail = () => {
  const { destination, fetching_destination, carouserImages } = useTourDetail();

  if (fetching_destination) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="tour-detail-container">
      <div className="tour-detail-header">
        <h1>{destination?.name}</h1>

        <Link to="/">
          <button className="back-button">
            <FaArrowLeft className="btnArrow" /> Volver
          </button>
        </Link>
      </div>
      <div className="tour-detail-content">
        <ImageCarousel images={carouserImages} mainImage={destination?.image} />
        <TourDescription destination={destination} />
      </div>

      <hr className="custom-divider" />

      {(destination?.traits?.length ?? 0) > 0 && (
        <section
          className="tour-traits-section"
          aria-labelledby="tour-traits-title"
        >
          <h2 id="tour-traits-title" className="tour-traits-heading">
            Características del destino
          </h2>
          <div className="tour-traits-list">
            {(destination.traits ?? []).map((trait) => (
              <div key={trait.id} className="tour-trait">
                {trait.imageUrl ? (
                  <img
                    src={trait.imageUrl}
                    alt=""
                    className="tour-trait-icon"
                    width={28}
                    height={28}
                  />
                ) : (
                  <span className="tour-trait-icon-fallback" aria-hidden />
                )}
                <p className="tour-trait-name">{trait.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="tour-description">
        <h1>Descripción general</h1>
        <p>{destination?.description}</p>
      </div>

      <div id="image-gallery" className="image-gallery">
        <h1>Galería de imágenes</h1>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="12px">
            {destination?.secondaryImages?.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Imagen ${index}`}
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default TourDetail;
