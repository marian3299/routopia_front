import api from "./api";
import { URLS } from "./urls";

export const getCategories = async ({ page = 0, size = 10, q } = {}) => {
  const params = new URLSearchParams({ page, size });
  if (q?.trim()) {
    params.append("q", q.trim());
  }
  const response = await api.get(`${URLS.GET_CATEGORIES}?${params.toString()}`);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(URLS.GET_CATEGORY_BY_ID(id));
  return response.data;
};

export const createCategory = async (formData) => {
  try {
    const response = await api.post(URLS.CREATE_CATEGORY, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, formData) => {
  try {
    const response = await api.put(URLS.UPDATE_CATEGORY(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  const response = await api.delete(URLS.DELETE_CATEGORY(id));
  return response.data;
};
