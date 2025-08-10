import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  setSearch,
  setHasSearch,
  getDestinationsList,
} from "../redux/routopiaActions";

const SearchContainer = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.routopiaStore);

  const onSearch = () => {
    if (search.trim()) {
      dispatch(setHasSearch(true));
      dispatch(getDestinationsList({ q: search.trim() }, 0, 1));
    }
  };

  return (
    <div className="search-container">
      <h1>Busca tu nueva aventura</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar tour por nombre o ciudad"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          value={search}
        />
        <button onClick={onSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default SearchContainer;
