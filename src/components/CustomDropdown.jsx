function CustomDropdown({ options, selectedValue, onValueChange, placeholder, id, openDropdown, onOpenDropdown}) {

  const isOpen =  openDropdown === id;

  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.name : placeholder;

  const handleSelect = (value) => {
    onValueChange(value);
    onOpenDropdown(false);
  };

  return (
    <div className="relative w-full cursor-[url('/cursor.png'),_auto]">
      <div
        onClick={() => onOpenDropdown(id)}
        className={`flex justify-between border w-45 border-[#646179] rounded-full px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] hover:opacity-80`}
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
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-[#FFD8AF] border-3 border-gray-600 rounded-lg shadow-lg
                     cursor-[url('/cursor.png'),_auto] overflow-auto h-max
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
              className={`px-3.5 py-2 hover:bg-[#c49a6e] cursor-[url('/cursor.png'),_auto] bg-[#FFD8AF]  text-[#4e2c08] text-sm select-none`}
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
