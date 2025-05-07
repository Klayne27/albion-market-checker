const baseURLimage = "https://render.albiononline.com/v1/item/";

function ShopSellItemList({ item, i, onShowPanel }) {
  return (
    <div
      className={`px-2 py-2 grid grid-cols-[2fr_2fr] justify-between ${
        i % 2 === 0 ? "bg-[#dab593]" : ""
      }`}
    >
      <div className="flex justify-start items-center">
        <div
          className={`w-[71px] h-[71px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
          style={{
            backgroundImage: `url('${baseURLimage}${item.id}?quality=${item.quality}')`,
            backgroundSize: "114%",
          }}
        ></div>
        <p className="ml-2 text-[#4e2c08] text-md">{item.name}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#4e2c08] text-md">100/100</span>
        <button
          type="button"
          className=" w-[112px] py-1 border-2 rounded-full text-lg border-gray-500 cursor-pointer shadow-[inset_0_0_10px_1px_#660101] bg-[#b10808] text-yellow-400 hover:opacity-80 active:scale-95"
          onClick={() => onShowPanel(item)}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default ShopSellItemList;
