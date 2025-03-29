import React from "react";

const Search = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term); // Call the search function passed as a prop
  };

  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default Search;
