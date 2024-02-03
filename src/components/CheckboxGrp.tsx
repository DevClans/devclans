import { FilterSidebarProps, SliderProps } from "@/types";
import CheckBoxItem from "./CheckBoxItem";

const CheckboxGrp = ({ data }: Partial<FilterSidebarProps>) => {
  return (
    <div className="flex flex-col" style={{ rowGap: 30 }}>
      {data?.map(
        ({ heading, key, title, type, data, ...sliderProps }, index) => (
          <div key={index}>
            <h3 className="">{heading || title}</h3>
            <CheckBoxItem
              key={index}
              type={type || ""}
              data={data}
              title={heading || title || ""}
              sliderProps={sliderProps as SliderProps}
            />
          </div>
        )
      )}
    </div>
  );
};

export default CheckboxGrp;
