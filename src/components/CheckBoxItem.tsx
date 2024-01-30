"use client";
import { SliderProps } from "@/types";
import { Checkbox, FormControlLabel, FormGroup, SliderInputBar } from ".";
import { PageProps } from "@/types/page.types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFilters, toggleFilter } from "@/utils/filterFunctions";

const CheckBoxItem = ({
  sliderProps,
  type,
  data,
  title,
}: {
  sliderProps: SliderProps;
  data: any;
  title: string;
  type: string;
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
  useEffect(() => {
    setGroup(
      searchParams.size == 0
        ? new Set<string>()
        : new Set((typeof filters == "object" && filters[titleString]) || [])
    );
  }, [searchParams]);
  // console.log("searchParams in checkboxitem", searchParams, searchParams.size);
  // console.log("group", group, filters, titleString);
  if (!titleString) {
    return <></>;
  }
  return (
    <>
      <FormGroup

      // className="gap-1 fcfs flex-nowrap max-h-[200px] overflow-x-scroll scrollbar-x"
      >
        {type == "slider" ? (
          <SliderInputBar
            {...(sliderProps as SliderProps)}
            onChange={(e, value) => {
              console.log("change value", value);
            }}
          />
        ) : (
          data.map((props: any, i: number) => {
            let label = "";
            if (typeof props === "string") {
              label = props.toLowerCase();
            } else if (typeof props === "object") {
              label = (props?.label.toLowerCase() || "") as string;
            }
            const onChange = (
              e: React.SyntheticEvent<Element, Event>,
              checked = false
            ) => {
              console.log("checked", checked);
              const { newParams: params, newGroup } = toggleFilter(
                newParams,
                filters,
                titleString,
                label
              );
              setGroup(newGroup);
              if (params) router.push(`?${params.toString()}`);
            };
            return (
              <FormControlLabel
                onChange={onChange}
                key={i}
                checked={group.has(label)}
                sx={{
                  m: 0,
                }}
                control={
                  <Checkbox
                    size="small"
                    style={{
                      color: "inherit",
                      height: 25,
                      width: 25,
                    }}
                    className="mr-1"
                  />
                }
                label={
                  <p
                    style={{
                      fontFamily: "var(--poppins)",
                    }}
                    className="text-sm font-medium capitalize"
                  >
                    {label}
                  </p>
                }
              />
            );
          })
        )}
      </FormGroup>
    </>
  );
};

export default CheckBoxItem;
