import { FaArrowRotateRight } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import { formatNumber } from "../../../utils/helpers";
import { ImCross } from "react-icons/im";
import { IoIosCheckmark } from "react-icons/io";
import { useDispatch } from "react-redux";
import { buyItem, sellItem } from "../../inventory/slices/inventorySlice";
import IconSlider from "../../../components/ui/IconSlider";
import PanelFilters from "./PanelFilters";
import PanelImgDescription from "./PanelImgDescription";
import PanelActions from "./PanelActions";

const baseURLimage = "https://render.albiononline.com/v1/item/";

const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

function ItemDetailPanel({ item, onClose, mode }) {
  const [quantity, setQuantity] = useState(() => {
    const initialMaxQuantity = mode === "sell" ? item?.quantity ?? 1 : 999;
    return mode === "sell" ? initialMaxQuantity : 1;
  });

  const dispatch = useDispatch();

  const maxQuantity = useMemo(() => {
    if (mode === "sell") {
      return item?.quantity ?? 1;
    }
    return 999;
  }, [mode, item?.quantity]);

  useEffect(() => {
    setQuantity((prevQuantity) => {
      const newMax = maxQuantity;
      if (mode === "sell") {
        return newMax;
      } else {
        const minAllowed = 0;
        return Math.max(minAllowed, Math.min(prevQuantity, newMax));
      }
    });
  }, [item, mode, maxQuantity]);

  const unitSellPrice = item?.price ?? 0;
  const unitBuyPrice = item?.sell_price_min ?? 0;

  const { premiumTax, setupFee, totalNetSellPrice, totalGrossValue } = useMemo(() => {
    const totalGrossValue = unitSellPrice * quantity;
    const tax = Math.round(totalGrossValue * 0.05);
    const fee = Math.round(totalGrossValue * 0.025);
    const net = totalGrossValue - tax - fee;
    return {
      premiumTax: tax,
      setupFee: fee,
      totalNetSellPrice: net,
      totalGrossValue: totalGrossValue,
    };
  }, [unitSellPrice, quantity]);

  const totalBuyPrice = useMemo(() => {
    if (mode !== "buy") return 0;
    return unitBuyPrice * quantity;
  }, [unitBuyPrice, quantity, mode]);

  const handleQuantityChange = (value) => {
    const clampedValue = Math.max(0, Math.min(maxQuantity, value));
    setQuantity(clampedValue);
  };

  const handleConfirmBuy = () => {
    const payload = {
      id: item.id,
      name: item.name,
      quantity: quantity,
      sell_price_min: item.sell_price_min,
      quality: item.quality,
    };
    dispatch(buyItem(payload));
    onClose();
  };

  const handleCreateSellOrder = () => {
    const sellPayload = {
      itemId: item.id,
      quality: item.quality,
      quantity: quantity,
      totalNetSilver: totalNetSellPrice,
    };
    dispatch(sellItem(sellPayload));
    onClose();
  };

  if (!item) return null;

  return (
    <div className="absolute left-[170px] transform w-[554px] border-4 border-[#8a6948] bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966] z-50  p-4 bottom-[100px]">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 border-2 rounded-full p-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] cursor-pointer"
        aria-label="Close panel"
      >
        <ImCross size={13} className="absolute  top-1 right-1" />
      </button>
      {mode === "sell" && (
        <>
          <PanelFilters />
          <div className="grid grid-cols-[1fr_4fr] p-3">
            <PanelImgDescription item={item} baseURLImage={baseURLimage} />
            <PanelActions mode={mode} />

            <p className="ml-7 mb-3 text-sm">Amount:</p>
            <IconSlider
              min={0}
              max={maxQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <p className="ml-9.5 mt-1 text-sm">Price:</p>
            <div className="border rounded-full p-1 max-w-60 max-h-8 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mb-4">
              <div className="border px-2 rounded-full max-w-70 text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] mb-3">
                <p>🪩 {formatNumber(totalGrossValue)}</p>
              </div>
            </div>
            <div></div>
            <p className="text-red-600 text-sm">
              🪩 {formatNumber(premiumTax)}(5% premium tax)
            </p>
            <div></div>
            <p className="mb-3 text-red-600 text-sm">
              🪩 {formatNumber(setupFee)}(2.5% setup fee)
            </p>

            <div className="ml-9 text-sm">Total: </div>
            <div className="flex justify-between text-sm">
              🪩 {formatNumber(totalNetSellPrice)}
              <button
                className="w-[112px] py-1.5 border-3 rounded-full text-sm border-gray-500 cursor-pointer active:scale-95 transition ease-in-out hover:opacity-80 duration-150 shadow-[inset_0_0_10px_1px_#660101] bg-[#b10808] text-yellow-400"
                onClick={handleCreateSellOrder}
              >
                Sell
              </button>
            </div>
          </div>
        </>
      )}
      {mode === "buy" && (
        <>
          <PanelFilters />

          <div className="grid grid-cols-[1fr_4fr] p-3">
            <PanelImgDescription item={item} baseURLImage={baseURLimage} />
            <PanelActions mode={mode} />

            <p className="ml-7 mb-3 text-sm">Amount:</p>
            <IconSlider
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <p className="ml-9.5 text-sm">Price:</p>
            <div className="flex mb-3">
              🪩 <p>{formatNumber(totalBuyPrice)}</p>
            </div>
            <p className="ml-3 text-sm">Transfer:</p>
            <div className="flex gap-2 py-0.5 px-2">
              <button
                type="button"
                className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700  cursor-pointer
                ${focusStyles}`}
              >
                <IoIosCheckmark size={15} style={{ strokeWidth: "8%" }} />
              </button>
              <label className="text-sm">Transfer completed purchases directly </label>
            </div>
            <div></div>
            <p className="ml-9.5 text-sm">to inventory</p>
            <div className="ml-9 mt-1 text-sm">Total:</div>
            <div className="flex justify-between mt-1 text-sm">
              🪩{formatNumber(totalBuyPrice)}
              <button
                className="w-[112px] py-1.5 border-3 rounded-full text-sm border-gray-500 cursor-pointer active:scale-95 transition ease-in-out hover:opacity-80 duration-150 shadow-[inset_0_0_10px_1px_#660101] bg-[#b10808] text-yellow-400"
                onClick={handleConfirmBuy}
              >
                Buy
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ItemDetailPanel;
