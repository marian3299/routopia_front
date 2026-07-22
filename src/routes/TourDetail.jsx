import React, { useCallback, useState } from "react";
import { FaArrowLeft, FaShareAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import TourDescription from "../components/TourDescription";
import TourPolicies from "../components/TourPolicies";
import TourReviews from "../components/TourReviews";
import ShareProductModal from "../components/ShareProductModal";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useTourDetail from "../hooks/useTourDetail";
import useShareProduct from "../hooks/useShareProduct";

const TourDetail = () => {
  const { destination, fetching_destination, carouserImages } = useTourDetail();
  const [ratingSummary, setRatingSummary] = useState({
    averageRating: null,
    totalReviews: null,
  });
  const {
    isOpen,
    openShareModal,
    closeShareModal,
    selectedNetwork,
    setSelectedNetwork,
    customMessage,
    setCustomMessage,
    productUrl,
    briefDescription,
    shareToNetwork,
    imageUrl,
    productName,
  } = useShareProduct(destination);

  const handleAverageChange = useCallback(({ averageRating, totalReviews }) => {
    setRatingSummary({ averageRating, totalReviews });
  }, []);

  if (fetching_destination) {
    return <div>Cargando...</div>;
  }

  const displayAverage =
    ratingSummary.averageRating ?? destination?.punctuation ?? 0;
  const displayCount =
    ratingSummary.totalReviews ?? destination?.reviewCount ?? 0;

  return (
    <div className="tour-detail-container">
      <div className="tour-detail-header">
        <div className="tour-detail-title-block">
          <h1>{destination?.name}</h1>
          <p className="tour-detail-rating">
            <FaStar className="icon" />
            <span>{Number(displayAverage).toFixed(1)}</span>
            <span className="tour-detail-rating-count">
              ({displayCount}{" "}
              {displayCount === 1 ? "valoración" : "valoraciones"})
            </span>
          </p>
        </div>

        <div className="tour-detail-header-actions">
          <button
            type="button"
            className="share-button"
            onClick={openShareModal}
          >
            <FaShareAlt className="btnArrow" /> Compartir
          </button>
          <Link to="/">
            <button type="button" className="back-button">
              <FaArrowLeft className="btnArrow" /> Volver
            </button>
          </Link>
        </div>
      </div>

      <ShareProductModal
        isOpen={isOpen}
        onClose={closeShareModal}
        productName={productName}
        imageUrl={imageUrl}
        briefDescription={briefDescription}
        productUrl={productUrl}
        selectedNetwork={selectedNetwork}
        onSelectNetwork={setSelectedNetwork}
        customMessage={customMessage}
        onMessageChange={setCustomMessage}
        onShare={shareToNetwork}
      />
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
          <h1 id="tour-traits-title" className="tour-traits-heading">
            Características del destino
          </h1>
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

      <TourReviews
        destinoId={destination?.id}
        onAverageChange={handleAverageChange}
      />

      <TourPolicies policies={destination?.policies} />

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
