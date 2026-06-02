export const URLS = {
  //Destionos
  GET_DESTINATIONS: "/destino",
  GET_DESTINATION_BY_ID: (id) => `/destino/${id}`,
  CREATE_DESTINATION: "/destino",
  UPDATE_DESTINATION: (id) => `/destino/${id}`,
  DELETE_DESTINATION: (id) => `/destino/${id}`,

  //Traits
  GET_TRAITS: "/traits",
  GET_TRAIT_BY_ID: (id) => `/traits/${id}`,
  CREATE_TRAIT: "/traits",
  UPDATE_TRAIT: (id) => `/traits/${id}`,
  DELETE_TRAIT: (id) => `/traits/${id}`,

  //Categories
  GET_CATEGORIES: "/categories",
  GET_CATEGORY_BY_ID: (id) => `/categories/${id}`,
  CREATE_CATEGORY: "/categories",
  UPDATE_CATEGORY: (id) => `/categories/${id}`,
  DELETE_CATEGORY: (id) => `/categories/${id}`,

  //Bookings
  CREATE_BOOKING: "/bookings",
  BOOKING_AVAILABILITY: "/bookings/availability",

  //Favorites
  GET_FAVORITES: "/favorites",
  TOGGLE_FAVORITE: (destinoId) => `/favorites/${destinoId}/toggle`,
};
