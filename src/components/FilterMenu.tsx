import { PageProps } from "@/types/page.types";
import CheckboxGrp from "./CheckboxGrp";
import { dummyFilterSteps } from "@/dummy/dummy.filter";
import ButtonCloseFilter from "./buttons/ButtonCloseFilter";

const FilterMenu = (props: PageProps) => {
  return (
    <div id="filterMenu" className="cardGrad" style={{}}>
      <div className="frcsb w100">
        <h2>Filters</h2>
        <ButtonCloseFilter />
      </div>
      <CheckboxGrp {...props} data={dummyFilterSteps} />
    </div>
  );
};

export default FilterMenu;
