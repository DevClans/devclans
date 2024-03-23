"use client";
import useFilters from "./CheckBoxItem";
import Autocomplete from "./Autocomplete";
const FilterAutocomplete = ({
  label,
  ...props
}: {
  options: string[];
  label: string;
}) => {
  const { group: selected, onChange } = useFilters({ title: label });
  console.log("selected here", selected, Array.from(selected));
  return (
    <Autocomplete
      isFilter={true}
      {...props}
      label={label}
      defaultValue={Array.from(selected)}
      setValue={onChange}
    />
  );
};

export default FilterAutocomplete;
