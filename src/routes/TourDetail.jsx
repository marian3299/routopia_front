import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import TourDescription from "../components/TourDescription";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const TourDetail = () => {
  return (
    <div className="tour-detail-container">
      <div className="tour-detail-header">
        <h1>Torre Eiffel</h1>

        <Link to="/">
          <button className="back-button">
            <FaArrowLeft className="btnArrow" /> Volver
          </button>
        </Link>
      </div>
      <div className="tour-detail-content ">
        <ImageCarousel />
        <TourDescription />
      </div>

      <hr className="custom-divider" />

      <div className="tour-description">
        <h1>Descripción general</h1>
        <p>
          Vive una experiencia inolvidable con este tour guiado por el monumento
          más emblemático de Francia. Accede a los niveles superiores de la
          Torre Eiffel sin complicaciones y disfruta de vistas panorámicas
          impresionantes de la Ciudad de la Luz. Aprende sobre su fascinante
          historia, su arquitectura y los secretos que esconde, de la mano de
          guías expertos. Perfecto para parejas, familias o viajeros solitarios
          que quieren captar la esencia de París desde lo más alto.
        </p>
      </div>

      <div id="image-gallery" className="image-gallery">
        <h1>Galería de imágenes</h1>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="12px">
            {[
              "/src/assets/torre_eiffel.jpg",
              "/src/assets/asakusa.webp",
              "/src/assets/chiapas.webp",
              "/src/assets/pertenon.jpg",
              "/src/assets/wat_pho.webp",
            ].map((src, index) => (
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
