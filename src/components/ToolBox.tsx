"use client";

import ButtonFilter from "./buttons/ButtonFilter";

const ToolBox = ({ count }: { count?: number }) => {
  return (
    <>
      <div className="w100 frcsb">
        <h3>{count ? `Around ${count} results found` : "Search Results"}</h3>
        <div>
          <ButtonFilter />
        </div>
      </div>
    </>
  );
};

export default ToolBox;
