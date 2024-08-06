import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
  clearSearchTerm,
} from "../redux/search/searchSlice";
import { MdClear } from "react-icons/md";

const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  function handleSearchInput(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  function handleClearSearchInput() {
    dispatch(clearSearchTerm());
  }

  return (
    <div id="search-container">
      <input
        onChange={handleSearchInput}
        value={searchTerm}
        placeholder="Search Todos"
      />
      {searchTerm.length > 0 && (
        <button
          type="button"
          id="search-clear-button"
          onClick={handleClearSearchInput}
        >
          <MdClear />
        </button>
      )}
    </div>
  );
};

export default Search;
