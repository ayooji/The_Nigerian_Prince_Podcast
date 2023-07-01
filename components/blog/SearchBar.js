import React, { useState } from "react";
import { Input, Grid } from "@nextui-org/react";
import CategoryTabs from "./CategoryTabs";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <Grid.Container gap={4} justify="center">
      <Grid>
        <Input
          size="lg"
          color="success"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={handleChange}
          bordered
        />
      </Grid>
    </Grid.Container>
  );
};

export default SearchBar;
