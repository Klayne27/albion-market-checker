function Tabs({ activeTab, setActiveTab }) {
  const tabStyles = (tabName) => {
    const baseStyles =
      "cursor-pointer px-4 py-5 font-bold rounded-tr-full rounded-br-full border-r-5 border-t-5 border-b-5 border-[#716F7B]";
    const activeStyles = "bg-[#535166] text-[#43342D] z-10 shadow-md active-tab-arrow";
    const inactiveStyles = "bg-[#2c2b35] hover:bg-[#535166] hover:shadow-sm";

    return `${baseStyles} ${activeTab === tabName ? activeStyles : inactiveStyles}`;
  };
  return (
    <div>
      <div className="flex mt-1 absolute flex-col left-[885px] top-38 gap-3">
        <button
          className={`${tabStyles("buy")} text-green-400`}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </button>
        <button
          className={`${tabStyles("sell")} text-red-500`}
          onClick={() => setActiveTab("sell")}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default Tabs;
