import React from "react";
import StarRating from "./StarRating";
import useProductReviews from "../hooks/useProductReviews";
import { useAuth } from "../context/AuthContext";

const formatReviewDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TourReviews = ({ destinoId, onAverageChange }) => {
  const { user } = useAuth();
  const {
    averageRating,
    totalReviews,
    canReview,
    alreadyReviewed,
    reviews,
    loading,
    submitting,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    comment,
    setComment,
    submitReview,
  } = useProductReviews(destinoId);

  React.useEffect(() => {
    onAverageChange?.({
      averageRating,
      totalReviews,
    });
  }, [averageRating, totalReviews, onAverageChange]);

  return (
    <section className="tour-reviews-section" aria-labelledby="tour-reviews-title">
      <div className="tour-reviews-header">
        <h2 id="tour-reviews-title" className="tour-reviews-heading">
          Valoraciones y reseñas
        </h2>
        <div className="tour-reviews-summary">
          <StarRating value={Math.round(averageRating || 0)} size="lg" />
          <div>
            <p className="tour-reviews-average">
              {(averageRating || 0).toFixed(1)}
            </p>
            <p className="tour-reviews-count">
              {totalReviews}{" "}
              {totalReviews === 1 ? "valoración" : "valoraciones"}
            </p>
          </div>
        </div>
      </div>

      {user && canReview && (
        <form className="review-form" onSubmit={submitReview}>
          <h3>Dejá tu valoración</h3>
          <p className="review-form-hint">
            Solo usuarios con una reserva finalizada pueden puntuar este destino.
          </p>
          <div className="review-form-stars">
            <span>Tu puntuación</span>
            <StarRating
              interactive
              value={hoverRating || rating}
              onChange={setRating}
              onHoverChange={setHoverRating}
              size="lg"
            />
          </div>
          <label htmlFor="review-comment">
            Comentario <span className="optional">(opcional)</span>
          </label>
          <textarea
            id="review-comment"
            rows={4}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Contá tu experiencia con este destino..."
            maxLength={1000}
          />
          <button
            type="submit"
            className="primary review-submit-btn"
            disabled={submitting || rating < 1}
          >
            {submitting ? "Publicando..." : "Publicar valoración"}
          </button>
        </form>
      )}

      {user && alreadyReviewed && (
        <p className="review-status-msg">
          Ya publicaste tu valoración para este destino.
        </p>
      )}

      {user && !canReview && !alreadyReviewed && (
        <p className="review-status-msg">
          Para valorar este producto necesitás tener una reserva finalizada.
        </p>
      )}

      {!user && (
        <p className="review-status-msg">
          Iniciá sesión para dejar tu valoración (si tenés una reserva
          finalizada).
        </p>
      )}

      <div className="reviews-list">
        {loading ? (
          <p>Cargando valoraciones...</p>
        ) : reviews.length === 0 ? (
          <p className="reviews-empty">
            Todavía no hay reseñas. Sé el primero en opinar.
          </p>
        ) : (
          reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-card-header">
                <StarRating value={review.rating} />
                <div>
                  <p className="review-user">{review.userName}</p>
                  <p className="review-date">
                    {formatReviewDate(review.createdAt)}
                  </p>
                </div>
              </div>
              {review.comment && (
                <p className="review-comment">{review.comment}</p>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default TourReviews;
