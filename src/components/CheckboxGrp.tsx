import Text from "@/components/Text";
import { FilterSidebarProps, SliderProps } from "@/types";
import { PageProps } from "@/types/page.types";
import CheckBoxItem from "./CheckBoxItem";

const CheckboxGrp = ({
  data,
  searchParams,
}: Partial<FilterSidebarProps> & PageProps) => {
  return (
    <div className="flex flex-col" style={{ rowGap: 30 }}>
      {data?.map(
        ({ heading, key, title, type, data, ...sliderProps }, index) => (
          <div key={index}>
            <Text
              type="semi16"
              textClass="text-base font-medium text-highlight"
            >
              {heading || title}
            </Text>
            <CheckBoxItem
              searchParams={searchParams}
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
