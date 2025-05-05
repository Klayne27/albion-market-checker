import DropdownFilters from "./DropdownFilters";
import SearchFilter from "./SearchFilter";

function Filters() {
  return (
    <div className="flex">
      <SearchFilter />
      <DropdownFilters />
    </div>
  );
}

export default Filters;
