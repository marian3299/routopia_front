import api from "./api";
import { URLS } from "./urls";

export const getReviewsByDestino = async (destinoId) => {
  const response = await api.get(URLS.GET_REVIEWS_BY_DESTINO(destinoId));
  return response.data;
};

export const createReview = async (payload) => {
  const response = await api.post(URLS.CREATE_REVIEW, payload);
  return response.data;
};
