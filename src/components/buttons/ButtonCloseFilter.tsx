"use client";
import { IconButton } from "@mui/material";
import { CloseRounded } from "..";

const ButtonCloseFilter = () => {
  const handleClick = () => {
    const filter = document.getElementById("filterMenu");
    if (filter) {
      filter.style.display = "none";
    }
  };
  return (
    <>
      <IconButton className="text-highlight" onClick={handleClick}>
        <CloseRounded fontSize="medium" />
      </IconButton>
    </>
  );
};

export default ButtonCloseFilter;
