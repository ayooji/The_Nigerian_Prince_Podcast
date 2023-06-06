import React, { useState } from "react";
import { Input } from "@nextui-org/react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <Input
      icon="search"
      color="primary"
      placeholder="Search blog posts..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;