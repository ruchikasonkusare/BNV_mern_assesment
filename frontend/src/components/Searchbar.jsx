import React, { useState } from "react";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      onSearch(value.trim());
    } else {
      onClear();
    }
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        className="search-input"
      />
      <button onClick={handleSearchClick} className="btn btn-search">Search</button>
    </div>
  );
};

export default SearchBar;