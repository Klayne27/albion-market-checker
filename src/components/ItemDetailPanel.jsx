import { FaArrowRotateRight } from "react-icons/fa6";
import { useBuyItem } from "../hooks/useBuyItem";
import { useSellItem } from "../hooks/useSellItem";
import { useState } from "react";
import { useShop } from "../hooks/useShop";
import { formatNumber } from "../utils/helpers";
import { ImCross } from "react-icons/im";
import { IoIosCheckmark } from "react-icons/io";

function ItemDetailPanel({ item, onClose, mode }) {
  const { buyItem, isBuying } = useBuyItem(); // Get mutation functions if needed
  const { sellItem, isSelling } = useSellItem(); // Get mutation functions if needed
  const [quantity, setQuantity] = useState(1); // Example state for amount
  const [price, setPrice] = useState(item?.price || 0); // Example state for sell price
  const [rememberMeClicked, setRememberMeClicked] = useState(false)
  const { shop, isLoading } = useShop();

  if (!item) return null; // Don't render if no item is selected

  const handleConfirmBuy = () => {
    // Add quantity logic if needed before buying
    buyItem(
      { ...item, quantity: quantity },
      {
        onSuccess: () => {
          onClose(); // Close panel on successful buy
        },
      }
    );
  };

  const handleCreateSellOrder = () => {
    // Here you'd likely need more complex logic for sell orders
    // involving setting price, quantity, etc.
    // For now, let's just simulate selling the item directly
    sellItem(item.name, {
      onSuccess: () => {
        onClose(); // Close panel on successful sell
      },
    });
  };

    const mainBannerClipPath = "polygon(0% 0%, 99% 0%, 99% 84%, 49% 99%, 0% 84%)";
    const borderClipPath = "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)";

    const commonHoverActiveStyles = `
    hover:bg-gradient-to-b hover:from-stone-800 hover:via-stone-700 hover:to-stone-500
    active:bg-stone-950
    active:scale-95
    transition ease-in-out duration-150
  `;

    const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

  return (
    <div className="fixed left-115 transform w-[33rem] border bg-[#EDC298] z-50 shadow-lg  p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 border-2 rounded-full p-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] cursor-pointer"
        aria-label="Close panel"
      >
        <ImCross size={10} className="absolute  top-1" />
      </button>
      {mode === "sell" && (
        <>
          <div className="flex border rounded-full p-[3px] gap-5 bg-[#716F7B] absolute top-31 left-3">
            <select className="border rounded-full w-35 px-2 text-xs bg-[#FBD7A6]">
              <option>Melee</option>
            </select>

            <select className="border rounded-full w-35 px-2 text-xs bg-[#FBD7A6]">
              <option>Sword</option>
            </select>

            <select className="border rounded-full w-35 px-2 text-xs bg-[#FBD7A6]">
              <option>Tier 8</option>
            </select>

            <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35]  relative">
              <FaArrowRotateRight size={14} className="absolute right-0.5 top-0.5" />
            </span>
          </div>

          <div className="grid grid-cols-[1fr_4fr] p-3">
            <div className="border w-20 h-20 mb-17"></div>
            <div className="text-sm h-full">
              <span className="font-semibold text-2xl">{item?.name}</span>
              <br />
              Use the filters below to compare different versions of the same item. Click
              on the restore button to switch back to the original selection.
            </div>

            <p className="ml-6">Action:</p>
            <div className="flex flex-col mb-7 gap-1">
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700  cursor-pointer ${
                    rememberMeClicked
                      ? "bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700"
                      : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Sell</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                    rememberMeClicked ? "" : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Buy</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                    rememberMeClicked ? "" : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Sell Order</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                    rememberMeClicked ? "" : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Buy Order</label>
              </div>
            </div>
            <p className="ml-5 mb-3">Amount</p>
            <input type="range" className="mb-3" />
            <p className="ml-10">Price</p>
            <div className="flex mb-3">
              <button>-</button>
              <p>{formatNumber(item?.price)}</p>
              <p>9% above average</p>
              <button>+</button>
            </div>
            <div></div>
            <p>380(2 % premium tax)</p>
            <div></div>
            <p>190(1 % setup fee)</p>
            <div className="ml-9 mt-1">Total:</div>
            <div className="flex justify-between mt-1">
              {formatNumber(item?.price)}
              <button
                className="px-9 py-1 border-3 rounded-full text-sm border-gray-500 cursor-pointer active:scale-95 transition ease-in-out duration-150 bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400 hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101] active:from-[#520101] active:via-[#690101] active:to-[#970202]"
                onClick={handleCreateSellOrder} // Adjust logic as needed
                disabled={isSelling}
              >
                Sell
              </button>
            </div>
          </div>
        </>
      )}
      {mode === "buy" && (
        <>
          <div className="flex border rounded-full p-[3px] gap-5 bg-[#716F7B] absolute top-31 left-3">
            <select className="border rounded-full w-35 px-2 text-xs bg-[#FBD7A6]">
              <option>Melee</option>
            </select>

            <select className="border rounded-full w-35 px-2 text-xs bg-[#FBD7A6]">
              <option>Sword</option>
            </select>

            <select className="border rounded-full w-35 px-2 text-xs bg-[#FBD7A6]">
              <option>Tier 8</option>
            </select>

            <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35]  relative">
              <FaArrowRotateRight size={14} className="absolute right-0.5 top-0.5" />
            </span>
          </div>

          <div className="grid grid-cols-[1fr_4fr] p-3">
            <div className="border w-20 h-20 mb-17"></div>
            <div className="text-sm h-full">
              <span className="font-semibold text-2xl">{item?.name}</span>
              <br />
              Use the filters below to compare different versions of the same item. Click
              on the restore button to switch back to the original selection.
            </div>

            <p className="ml-6">Action:</p>
            <div className="flex flex-col mb-7 gap-1">
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                    rememberMeClicked ? "" : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label className="font-semibold">Sell</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700  cursor-pointer ${
                    rememberMeClicked
                      ? "bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700"
                      : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Buy</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                    rememberMeClicked ? "" : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Sell Order</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="rem-me"
                  className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                    rememberMeClicked ? "" : ""
                  } ${commonHoverActiveStyles} ${focusStyles}`}
                  onClick={() => setRememberMeClicked((c) => !c)}
                >
                  <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                </button>
                <label>Buy Order</label>
              </div>
            </div>
            <p className="ml-5 mb-3">Amount</p>
            <input type="range" className="mb-3" />
            <p className="ml-10">Price</p>
            <div className="flex mb-3">
              <button>-</button>
              <p>{formatNumber(item?.price)}</p>
              <p>9% above average</p>
              <button>+</button>
            </div>
            <div></div>
            <p>380(2 % premium tax)</p>
            <div></div>
            <p>380(2 % premium tax)</p>
            <div className="ml-9 mt-1">Total:</div>
            <div className="flex justify-between mt-1">
              {formatNumber(item?.price)}
              <button
                className="px-9 py-1 border-3 rounded-full text-sm border-gray-500 cursor-pointer active:scale-95 transition ease-in-out duration-150 bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400 hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101] active:from-[#520101] active:via-[#690101] active:to-[#970202]"
                onClick={handleConfirmBuy}
                disabled={isSelling}
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
