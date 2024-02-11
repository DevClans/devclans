import { FilterSidebarProps } from "@/types";
import Autocomplete from "./Autocomplete";

const CheckboxGrp = ({ data }: Partial<FilterSidebarProps>) => {
  return (
    <div className="flex flex-col w100 gap-4">
      {data?.map(
        ({ heading, key, title, type, data, ...sliderProps }, index) => (
          <div key={index} className="w100">
            <label className="">{heading || title}</label>
            {/* <CheckBoxItem
              key={index}
              type={type || ""}
              data={data}
              title={heading || title || ""}
              sliderProps={sliderProps as SliderProps}
            /> */}
            <Autocomplete
              label={key || heading || title || ""}
              options={data as string[]}
            />
          </div>
        )
      )}
    </div>
  );
};

export default CheckboxGrp;
