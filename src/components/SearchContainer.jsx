import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMagnifyingGlass, FaRegCalendar } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setHasSearch, setSearch, setSearchDate } from "../redux/routopiaActions";
import { actions } from "../redux/routopiaSilce";

const SearchContainer = () => {
  const dispatch = useAppDispatch();
  const { inputSearch, searchDate } = useAppSelector(
    (state) => state.routopiaStore,
  );

  const onSearch = () => {
    if (inputSearch.trim() || searchDate) {
      dispatch(setHasSearch(true));
      dispatch(setSearch(inputSearch));
    }
  };

  return (
    <div className="search-container">
      <h1>Busca tu nueva aventura</h1>
      <div className="search-bar">
        <div className="search-bar__field">
          <FaMagnifyingGlass className="search-bar__icon" />
          <div className="search-bar__text">
            <span className="search-bar__label">Destino</span>
            <input
              type="text"
              placeholder="Buscar tour por nombre o ciudad"
              onChange={(e) =>
                dispatch(
                  actions.setInputSearch({ inputSearch: e.target.value }),
                )
              }
              value={inputSearch}
            />
          </div>
        </div>

        <div className="search-bar__divider" />

        <div className="search-bar__field">
          <FaRegCalendar className="search-bar__icon" />
          <div className="search-bar__text">
            <span className="search-bar__label">Fecha deseada</span>
            <DatePicker
              selected={searchDate}
              onChange={(date) => dispatch(setSearchDate(date))}
              dateFormat="dd/MM/yyyy"
              placeholderText="Cualquier fecha"
              minDate={new Date()}
              isClearable
              withPortal
            />
          </div>
        </div>

        <button
          type="button"
          className="search-bar__submit"
          onClick={onSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchContainer;
