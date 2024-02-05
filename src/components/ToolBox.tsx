"use client";

import ButtonFilter from "./buttons/ButtonFilter";

const ToolBox = ({ count }: { count?: number }) => {
  const countEle = (
    <>
      Around <span className="text-primary font-bold ">{count}</span> results
      found
    </>
  );
  return (
    <>
      <div className="w100 frcsb">
        <h3 className="text-text normal-case">
          {count ? countEle : "Search results"}
        </h3>
        <div>
          <ButtonFilter />
        </div>
      </div>
    </>
  );
};

export default ToolBox;
