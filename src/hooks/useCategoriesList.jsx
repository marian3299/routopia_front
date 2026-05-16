import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { getCategories } from "../services/category.service";

const useCategoriesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategories();
      setCategories(res.content);
      setFilteredCategories(res.content);
    } catch (err) {
      console.error("Error fetching categories:", err);
      notify({ message: "Error al cargar categorías", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    setCategories,
    searchTerm,
    setSearchTerm,
    filteredCategories,
    loading,
  };
};

export default useCategoriesList;
