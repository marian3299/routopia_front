import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setHasSearch, setSearch } from "../redux/routopiaActions";
import { actions } from "../redux/routopiaSilce";

const SearchContainer = () => {
  const dispatch = useAppDispatch();
  const { inputSearch } = useAppSelector((state) => state.routopiaStore);

  const onSearch = () => {
    if (inputSearch.trim()) {
      dispatch(setHasSearch(true));
      dispatch(setSearch(inputSearch));
    }
  };

  return (
    <div className="search-container">
      <h1>Busca tu nueva aventura</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar tour por nombre o ciudad"
          onChange={(e) =>
            dispatch(actions.setInputSearch({ inputSearch: e.target.value }))
          }
          value={inputSearch}
        />
        <button onClick={onSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default SearchContainer;
