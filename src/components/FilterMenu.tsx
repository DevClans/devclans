"use client";
import { FilterChipMap, FilterChipProps } from "@/types";
import CheckboxGrp from "./CheckboxGrp";
import { dummyFilterSteps } from "@/dummy/dummy.filter";
import { useState } from "react";

const FilterMenu = () => {
  const [filters, setFilters] = useState<FilterChipMap>({});
  // * CLEAR ALL FILTERS
  const clearFilters = () => {
    setFilters({});
  };
  const addFilter = (chip: FilterChipProps) => {};
  const removeFilter = (chip: FilterChipProps) => {};
  return (
    <div id="filterMenu" className="cardGrad" style={{}}>
      <CheckboxGrp
        filters={filters}
        removeFilter={removeFilter}
        addFilter={addFilter}
        data={dummyFilterSteps}
      />
    </div>
  );
};

export default FilterMenu;
