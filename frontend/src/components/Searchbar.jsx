import React, { useState } from "react";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name, email, location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="search-input"
      />
      <button onClick={handleSearch} className="btn btn-primary">Search</button>
      {query && (
        <button onClick={handleClear} className="btn btn-secondary">Clear</button>
      )}
    </div>
  );
};

export default SearchBar;