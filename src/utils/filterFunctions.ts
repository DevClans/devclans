export const toggleFilter = (
  newParams: URLSearchParams,
  filters: Record<string, string[]>,
  title: string,
  label: string
) => {
  // console.log("data in togglegilter", newParams.toString(), filters);
  const newFilters = { ...filters };
  if (!(newParams instanceof URLSearchParams) || !label || !title) {
    console.info("newParams is not a URLSearchParams");
    return {
      newParams,
      newGroup: new Set<string>(),
    };
  }
  const newGroup = new Set(filters?.[title] || []);
  const isAdd = !newGroup.has(label);
  isAdd ? newGroup.add(label) : newGroup.delete(label);
  const arr = Array.from(newGroup);
  // console.log("aryr", arr);
  if (isAdd) {
    // add the label to the filter
    newParams.set(
      "filters",
      JSON.stringify({
        ...filters,
        [title]: arr,
      })
    );
  } else {
    // remove the label from the filter
    if (arr.length == 0) {
      // console.log("arr", newFilters);
      if (Object.keys(newFilters).length == 0) {
        newParams.delete("filters");
      } else {
        delete newFilters[title];
        newParams.set("filters", JSON.stringify(newFilters));
      }
    } else {
      newParams.set(
        "filters",
        JSON.stringify({
          ...filters,
          [title]: arr,
        })
      );
    }
  }
  // console.log("newParams", newParams.getAll("filters"), newParams.toString());
  return {
    newParams,
    newGroup,
  };
};

export const getFilters = (searchParams: any) => {
  let newParams = new URLSearchParams(searchParams || "");
  let filter = newParams?.get("filters") || "";
  const filters = (filter && (JSON.parse(filter) as any)) || {};
  return {
    newParams,
    filters,
  };
};
