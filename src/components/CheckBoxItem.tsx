"use client";
import { PageProps } from "@/types/page.types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getFilters, toggleFilter } from "@/utils/filterFunctions";

const useFilters = ({
  title,
}: {
  title: string;
} & PageProps) => {
  const titleString = title.toLowerCase();
  const searchParams = useSearchParams();
  const router = useRouter();
  let { filters, newParams } = getFilters(searchParams);
  const [group, setGroup] = useState<Set<string>>(
    searchParams.size == 0
      ? new Set<string>()
      : new Set((typeof filters == "object" && filters[titleString]) || [])
  );
  const onChange = useCallback(
    (value: string, checked: boolean = false) => {
      let label = value.toLowerCase();

      console.log("checked", checked);
      const { newParams: params, newGroup } = toggleFilter(
        newParams,
        filters,
        titleString,
        label
      );
      setGroup(newGroup);
      if (params) router.push(`?${params.toString()}`);
    },
    [filters, newParams, router, titleString]
  );

  useEffect(() => {
    setGroup(
      searchParams.size == 0
        ? new Set<string>()
        : new Set((typeof filters == "object" && filters[titleString]) || [])
    );
  }, [searchParams]);
  // console.log("searchParams in checkboxitem", searchParams, searchParams.size);
  // console.log("group", group, filters, titleString);
  return {
    group,
    setGroup,
    onChange,
  };
};

export default useFilters;
