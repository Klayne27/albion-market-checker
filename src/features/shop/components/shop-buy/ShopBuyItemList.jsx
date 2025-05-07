import { useSelector } from "react-redux";
import { formatNumber, formatTimeAgoUTC } from "../../../../utils/helpers";

const baseURLimage = "https://render.albiononline.com/v1/item/";

function ShopBuyItemList({ item, i, onShowPanel }) {
  const selectCity = useSelector((state) => state.filter.selectCity);

  return (
    <div
      key={`${baseURLimage}${item.id}?quality=${item.quality}`}
      className={`px-2 py-2 grid grid-cols-[2fr_1fr_2fr] items-center ${
        i % 2 === 0 ? "bg-[#dab593]" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-[71px] h-[71px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
          style={{
            backgroundImage: `url('${baseURLimage}${item.id}?quality=${item.quality}')`,
            backgroundSize: "114%",
          }}
        ></div>

        {selectCity === "" ? (
          <div className="flex flex-col">
            <p className="text-[#4e2c08] text-sm" title={item.name}>
              {item.name}
            </p>
            <p className="text-[#4e2c08] text-sm">({item.city})</p>
          </div>
        ) : (
          <p className="text-[#4e2c08] text-sm" title={item.name}>
            {item.name}
          </p>
        )}
      </div>
      <p className="ml-4 text-[#4e2c08] text-md">
        {item.sell_price_min_date ? formatTimeAgoUTC(item.sell_price_min_date) : "N/A"}
      </p>
      <div className="flex justify-between items-center ml-4">
        <span className="text-[#4e2c08] text-md">
          {`🪩 ${formatNumber(item.sell_price_min)}`}
        </span>
        <button
          type="button"
          className=" w-[112px] py-1 border-2 rounded-full text-lg border-gray-500 cursor-pointer shadow-[inset_0_0_10px_1px_#660101] bg-[#b10808] text-yellow-400 hover:opacity-80 active:scale-95"
          onClick={() => onShowPanel(item)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default ShopBuyItemList;
