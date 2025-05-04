import { useDispatch, useSelector } from "react-redux";
import { handleResetSearch, setSearchTerm } from "../../../../slices/filterSlice";
import { FaArrowRotateLeft } from "react-icons/fa6";

function SearchFilter() {
  const { searchTerm } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="flex border rounded-full p-[4px] gap-0.5 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-4 z-50">
      <input
        className=" rounded-full w-[144px] px-2 h-5.5 text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] placeholder:text-[#926e47] hover:opacity-80"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <span
        className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative  hover:opacity-80 cursor-pointer"
        onClick={() => dispatch(handleResetSearch())}
      >
        <FaArrowRotateLeft size={16} className="absolute right-0.5 top-0.5" />
      </span>
    </div>
  );
}

export default SearchFilter;
