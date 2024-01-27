import { PageProps } from "@/types/page.types";
import CheckboxGrp from "./CheckboxGrp";
import { dummyFilterSteps } from "@/dummy/dummy.filter";

const FilterMenu = (props: PageProps) => {
  return (
    <div id="filterMenu" className="cardGrad" style={{}}>
      <CheckboxGrp {...props} data={dummyFilterSteps} />
    </div>
  );
};

export default FilterMenu;
