import { useDispatch, useSelector } from "react-redux";
import {
  handleResetFilters,
  setSelectEnchantment,
  setSelectQuality,
  setSelectTier,
  setSelectType,
} from "../../../slices/filterSlice";
import {
  enchantmentOptions,
  qualityOptions,
  tierOptions,
  typeOptions,
} from "../../../../../data/itemOptions";
import CustomDropdown from "../../../../../components/ui/CustomDropdown";
import { FaArrowRotateLeft } from "react-icons/fa6";

function DropdownFilters() {
  const {
    selectTier,
    selectEnchantment,
    selectType,
    selectQuality,
    isTierInteracted,
    isTypeInteracted,
    isEnchantmentInteracted,
    isQualityInteracted,
  } = useSelector((state) => state.filter);

  const dropdownSelectedQualityValue =
    selectQuality.length === qualityOptions.length - 1
      ? "All"
      : selectQuality.length === 1
      ? selectQuality[0]
      : "";

  const dispatch = useDispatch();

  const handleSelectQuality = (value) => {
    dispatch(setSelectQuality(value));
  };

  const handleSelectTier = (value) => {
    dispatch(setSelectTier(value));
  };

  const handleSelectEnchantment = (value) => {
    dispatch(setSelectEnchantment(value));
  };

  const handleSelectType = (value) => {
    dispatch(setSelectType(value));
  };

  return (
    <div className="flex border rounded-full p-[4px] gap-4 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-3">
      <CustomDropdown
        id="type"
        options={typeOptions}
        selectedValue={selectType}
        onValueChange={handleSelectType}
        placeholder="Type"
        isInteracted={isTypeInteracted}
        allOptionValue="All"
      />
      <CustomDropdown
        id="tier"
        options={tierOptions}
        selectedValue={selectTier}
        onValueChange={handleSelectTier}
        placeholder="Tier"
        isInteracted={isTierInteracted}
        allOptionValue="All"
      />
      <CustomDropdown
        id="enchantment"
        options={enchantmentOptions}
        selectedValue={selectEnchantment}
        onValueChange={handleSelectEnchantment}
        placeholder="Enchantment"
        isInteracted={isEnchantmentInteracted}
        allOptionValue="All"
      />
      <div className="flex gap-1">
        <CustomDropdown
          id="quality"
          options={qualityOptions}
          selectedValue={dropdownSelectedQualityValue}
          onValueChange={handleSelectQuality}
          placeholder="Quality"
          isInteracted={isQualityInteracted}
          allOptionValue="All"
        />
        <span
          className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative  hover:opacity-80 cursor-pointer"
          onClick={() => dispatch(handleResetFilters())}
        >
          <FaArrowRotateLeft size={16} className="absolute right-0.5 top-0.5" />
        </span>
      </div>
    </div>
  );
}

export default DropdownFilters;
