"use client";

import colors from "@/lib/colors";
import { debounce } from "@/lib/debounce";
import { SearchRounded } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleChange = debounce((value: string) => {
    setSearch(value);
    // to search just after stopping typing
    newParams.set("search", value);
    console.log("newParams", newParams.toString());
    router.push("?" + newParams.toString());
  }, 300);
  const link = (search: string) => {
    newParams.set("search", search);
    return "?search=" + newParams.toString();
  };
  const clearSearch = () => {
    const searchbar = document.getElementById(
      "searchbar"
    ) as HTMLInputElement | null;
    if (searchbar) {
      searchbar.value = "";
    }
  };
  // to clear on route change
  // useEffect(() => {
  //   clearSearch();
  // }, [router]);
  return (
    <div
      className="relative card rounded-[20px] has-[:focus]:border-priDark has-[:focus]:rounded-[10px] transition-border-radius duration-150 ease-in-out frc gap-3 w-full frcsb"
      style={{
        // backdropFilter: "blur(27.100000381469727px)",
        background:
          "linear-gradient(0deg, rgba(231, 239, 255, 0.04) 0%, rgba(230, 239, 255, 0.00) 100%, rgba(231, 239, 255, 0.00) 100%), rgba(2, 12, 32, 0.08)",
        height: 66,
        boxSizing: "border-box",
      }}
    >
      <form className="w100 " autoComplete="off" autoCorrect="off">
        <input
          id="searchbar"
          name="search"
          className="w100 p-3 "
          style={{
            background: "transparent",
            outline: "none",
            border: "none",
          }}
          placeholder="Search"
          defaultValue={search}
          onChange={(e) => handleChange(e.target.value)}
        />
        <input type="submit" hidden />
      </form>

      <Link
        className="pr-3 py-3"
        href={link(search)}
        onClick={(e) => {
          if (!search) {
            e.preventDefault();
          } else {
            clearSearch();
          }
        }}
      >
        <SearchRounded
          style={{
            color: search ? colors.priDark : colors.text,
          }}
        />
      </Link>
    </div>
  );
};

export default SearchBar;
