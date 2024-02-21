"use client";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import FilterDialogItem from "./FilterDialogItem";
import SearchBox from "./SearchBox";
import { X } from "lucide-react";
import colors from "@/lib/colors";

const Autocomplete = ({
  options,
  label,
  setValue,
  defaultValue,
  isFilter = false,
  limit,
  name,
  className,
}: {
  options: string[];
  label: string | React.ReactNode;
  name?: string;
  isFilter?: boolean;
  setValue: any;
  defaultValue?: string[];
  limit?: number;
} & { className?: string }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
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
    if (isFilter) {
      setValue(value);
      return;
    }
    const newVal = [...selected].filter((item) => item !== value);
    setValue(name, newVal);
    setSelected(newVal);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (isFilter) {
      setValue(value);
      return;
    }
    // console.log("value", value, checked);
    if (!checked) {
      // already selected, remove it
      removeValue(value);
    } else {
      if ((limit && selected.length >= limit) || selected.includes(value)) {
        return;
      }
      const newVal = [...selected, value];
      setValue(name, newVal);
      setSelected(newVal);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative w100" ref={containerRef}>
      <div
        className={`card2  frc flex-wrap gap-1 min-h-[40px] ${
          className || "!rounded-[10px] p-1 px-2"
        }`}
        onClick={() => setShow(!show)}
      >
        {Array.isArray(selected) && selected.length > 0 ? (
          selected?.map((skill, index) => (
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
                active={selected.includes(skill)}
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
