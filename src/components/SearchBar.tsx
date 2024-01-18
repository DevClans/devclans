"use client";

import { SearchRounded } from "@mui/icons-material";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div
      className="relative card frc gap-3 w-full frcsb"
      style={{
        borderRadius: "20px",
        // backdropFilter: "blur(27.100000381469727px)",
        padding: 15,
        background:
          "linear-gradient(0deg, rgba(231, 239, 255, 0.04) 0%, rgba(230, 239, 255, 0.00) 100%, rgba(231, 239, 255, 0.00) 100%), rgba(2, 12, 32, 0.08)",
        height: 66,
        boxSizing: "border-box",
      }}
    >
      <input
        className="w100"
        style={{
          background: "transparent",
          outline: "none",
        }}
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <SearchRounded />
    </div>
  );
};

export default SearchBar;
