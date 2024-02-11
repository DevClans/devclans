import colors from "@/lib/colors";
import { ButtonProps } from "@/types";
import { Check } from "lucide-react";

const FilterDialogItem = ({ label, onChange, active }: ButtonProps) => {
  return (
    <div className="py-2 px-4 w100 hover:bg-border rounded-[10px] relative frcsb">
      <label htmlFor="filter item" className="capitalize">
        {label}
      </label>
      <input
        name="filter item"
        value={label as string}
        // checked={active as boolean}
        type="checkbox"
        onChange={onChange}
        className="w-full h-full  top-0 left-0 opacity-0 cursor-pointer z-10 absolute"
      />
      {active && <Check size={16} color={colors.subH} />}
    </div>
  );
};

export default FilterDialogItem;
