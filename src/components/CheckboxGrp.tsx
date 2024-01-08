import Text from "@/components/Text";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@/components/mui/muiComponents";
import SliderInputBar from "./sliders/SliderInputBar";
import Link from "next/link";
import { FilterSidebarProps, SliderProps } from "@/types";

const CheckboxGrp = ({
  data,
  addFilter,
  removeFilter,
  filters,
}: FilterSidebarProps) => {
  return (
    <div className="flex flex-col" style={{ rowGap: 30 }}>
      {data.map(
        ({ heading, key, title, type, data, ...sliderProps }, index) => (
          <div key={index}>
            <Text type="semi16">{heading || title}</Text>
            <FormGroup>
              {/* this component can use slider as well as checkbox */}
              {type == "slider" ? (
                <SliderInputBar
                  {...(sliderProps as SliderProps)}
                  onChange={(e, value) => {
                    console.log("change value", value);
                    addFilter({
                      key,
                      label: value.toString(),
                    });
                  }}
                />
              ) : (
                data.map(({ label }, i) => {
                  const checkked = Boolean(
                    filters[key?.toLowerCase()] &&
                      label?.toLowerCase() in filters[key]
                  );
                  const currentFilter = { key, label };
                  // console.log("checked", filters[key]);
                  const onChange = (
                    e: React.SyntheticEvent<Element, Event>,
                    checked = checkked
                  ) => {
                    // console.log("checked", checked);
                    if (checked) {
                      // if already in filter
                      return removeFilter(currentFilter);
                    }

                    addFilter(currentFilter);
                  };
                  return (
                    <FormControlLabel
                      onChange={onChange}
                      key={i + label}
                      control={
                        // <button
                        //   onClick={(e) => {
                        //     // e.stopPropagation();
                        //     console.log("link click");
                        //     onChange(e);
                        //   }}
                        //   // href={{
                        //   //   pathname: "/explore",
                        //   // }}
                        // >
                        <Checkbox
                          style={{
                            color: "inherit",
                          }}
                          // onChange={onChange}
                        />
                        // </button>
                      }
                      label={<Text type="medi16">{label}</Text>}
                    />
                  );
                })
              )}
            </FormGroup>
          </div>
        )
      )}
    </div>
  );
};

export default CheckboxGrp;
