import { useDispatch, useSelector } from "react-redux";
import { handleToggleDropdown } from "../../features/shop/slices/filterSlice";
import { useEffect, useRef } from "react";

function CustomDropdown({ options, selectedValue, onValueChange, placeholder, id }) {
  const dispatch = useDispatch();
  const openDropdown = useSelector((state) => state.filter.openDropdown);

  const isOpen = openDropdown === id;

  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        dispatch(handleToggleDropdown(false));
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, dispatch]);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.name : placeholder;

  const handleSelect = (value) => {
    onValueChange(value);
    dispatch(handleToggleDropdown(false));
  };

  return (
    <div className="relative w-full cursor-pointer" ref={dropDownRef}>
      <div
        onClick={() => dispatch(handleToggleDropdown(id))}
        className={`flex justify-between border w-[144px] border-[#646179] rounded-full px-2 text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] hover:opacity-80`}
      >
        <span>{displayText}</span>
        <svg
          className={`w-4 h-4 transform`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 15"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-[#FFD8AF] border-3 border-gray-600 rounded-lg shadow-lg
                      cursor-pointer overflow-auto h-max
          "
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                if (option && option.value !== undefined) {
                  handleSelect(option.value);
                } else {
                  console.error("Clicked item had undefined option or value:", option);
                }
              }}
              className={`px-3.5 py-1 hover:bg-[#c49a6e] cursor-pointer text-xs bg-[#FFD8AF]  text-[#4e2c08] select-none`}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
