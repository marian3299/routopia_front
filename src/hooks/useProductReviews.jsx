import { useCallback, useEffect, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { createReview, getReviewsByDestino } from "../services/review.service";

const useProductReviews = (destinoId) => {
  const { notify } = useNotification();
  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    canReview: false,
    alreadyReviewed: false,
    reviews: [],
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = useCallback(async () => {
    if (!destinoId) return;
    setLoading(true);
    try {
      const data = await getReviewsByDestino(destinoId);
      setSummary({
        averageRating: data.averageRating ?? 0,
        totalReviews: data.totalReviews ?? 0,
        canReview: !!data.canReview,
        alreadyReviewed: !!data.alreadyReviewed,
        reviews: data.reviews || [],
      });
    } catch (error) {
      console.error("Error loading reviews:", error);
      notify({
        message: "No se pudieron cargar las valoraciones.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [destinoId, notify]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const submitReview = async (event) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      notify({
        message: "Selecciona una puntuación de 1 a 5 estrellas.",
        type: "error",
      });
      return;
    }

    setSubmitting(true);
    try {
      const data = await createReview({
        destinoId,
        rating,
        comment: comment.trim() || null,
      });
      setSummary({
        averageRating: data.averageRating ?? 0,
        totalReviews: data.totalReviews ?? 0,
        canReview: !!data.canReview,
        alreadyReviewed: !!data.alreadyReviewed,
        reviews: data.reviews || [],
      });
      setRating(0);
      setHoverRating(0);
      setComment("");
      notify({
        message: "¡Gracias! Tu valoración fue publicada.",
        type: "success",
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "No se pudo publicar la valoración. Intenta nuevamente.";
      notify({ message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    ...summary,
    loading,
    submitting,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    comment,
    setComment,
    submitReview,
    refreshReviews: fetchReviews,
  };
};

export default useProductReviews;
