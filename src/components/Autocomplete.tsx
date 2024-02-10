"use client";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import FilterDialogItem from "./FilterDialogItem";
import SearchBox from "./SearchBox";
import { X } from "lucide-react";
import colors from "@/lib/colors";
import useFilters from "./CheckBoxItem";

const Autocomplete = ({
  options,
  label,
}: {
  options: string[];
  label: string;
}) => {
  // FILTER REALTED THINGS
  const { group: selected, onChange } = useFilters({ title: label });
  // BELOW THIS IS INDEPENDENT COMPONENT
  const [show, setShow] = useState(false);
  // const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const containerRef: any = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShow(false); // Clicked outside, close the box
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const removeValue = (value: string) => {
    // setSelected((prev) => (prev.delete(value), new Set(prev)));
    onChange(value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
    // if (checked) {
    //   // already selected, remove it
    //   removeValue(value);
    // } else {
    //   setSelected((prev) => new Set(prev.add(value)));
    // }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative w100" ref={containerRef}>
      <div
        className="card2 !rounded-[10px] p-1 px-2 frc flex-wrap gap-1 min-h-[40px]"
        onClick={() => setShow(!show)}
      >
        {selected.size > 0 ? (
          Array.from(selected)?.map((skill, index) => (
            <div
              key={index}
              className="frc gap-1 py-1 px-2 bg-border rounded-[10px]"
            >
              <h3>{skill}</h3>
              <X
                size={16}
                className="hover"
                onClick={() => removeValue(skill)}
                color={colors.subH}
              />
            </div>
          ))
        ) : (
          <p className="opacity-[0.6]">Select {label || ""}</p>
        )}
      </div>
      {show && (
        <Dialog setShow={setShow}>
          <SearchBox value={search} onChange={handleSearchChange} />
          {options
            ?.filter((item) => item?.includes(search))
            .sort()
            .map((skill, index) => (
              <FilterDialogItem
                active={selected.has(skill)}
                key={index}
                onChange={handleChange}
                label={skill}
              />
            ))}
        </Dialog>
      )}
    </div>
  );
};

export default Autocomplete;
