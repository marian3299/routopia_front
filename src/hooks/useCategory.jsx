import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationsList } from "../redux/routopiaActions";
import { useParams } from "react-router-dom";
import usePagination from "./usePagination";
import { getCategoryById } from "../services/category.service";

const useCategory = (pageSize = 10) => {
  const { destinations, fetching_destinations } = useAppSelector(
    (state) => state.routopiaStore,
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const categoryId = id ? Number(id) : null;
  const [categoryName, setCategoryName] = useState("Destino");

  const pagination = usePagination(
    (query, page, size) => dispatch(getDestinationsList(query, page, size)),
    0,
    pageSize,
    categoryId ? { category: [categoryId] } : {},
  );

  useEffect(() => {
    pagination.goToPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categoryId) {
      pagination.updateQuery({ category: [categoryId] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    if (!categoryId || Number.isNaN(categoryId)) return;

    getCategoryById(categoryId)
      .then((category) => setCategoryName(category.name ?? "Destino"))
      .catch(() => setCategoryName("Destino"));
  }, [categoryId]);

  return {
    destinations,
    fetching_destinations,
    getCategoryName: () => categoryName,
  };
};

export default useCategory;
