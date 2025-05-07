import { IoIosCheckmark } from "react-icons/io";

const ribbonStrip =
  "polygon(0% 0%, 100% 0%, calc(100% - 15px) 50%, 100% 100%, 0% 100%, 0px 50%)";

const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

const inactiveButton = `bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f]`;
const activeButton = `bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700 `;

function PanelActions({ mode }) {
  return (
    <>
      <p className="ml-7 text-sm">Action:</p>
      <div className="flex flex-col mb-7">
        <div className="flex gap-2 py-0.5 px-2">
          <button
            className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer
            ${focusStyles}`}
          >
            <IoIosCheckmark size={15} style={{ strokeWidth: "8%" }} />
          </button>
          <label className="text-sm">Sell</label>
        </div>
        <div
          className={`flex gap-2 py-0.5 px-2 ${mode === "buy" ? "bg-[#608b3d]" : ""}`}
          style={{ clipPath: mode === "buy" ? ribbonStrip : "" }}
        >
          <button
            className={`text-sm border-3 rounded-full border-gray-500 cursor-pointer ${
              mode === "buy" ? activeButton : inactiveButton
            }
            ${focusStyles}`}
          >
            <IoIosCheckmark size={15} style={{ strokeWidth: "8%" }} />
          </button>
          <label className={`text-sm ${mode === "buy" ? "text-yellow-400" : ""}`}>
            Buy
          </label>
        </div>
        <div
          className={`flex gap-2 py-0.5 px-2 ${mode === "sell" ? "bg-[#923826]" : ""}`}
          style={{ clipPath: mode === "sell" ? ribbonStrip : "" }}
        >
          <button
            className={`text-sm border-3 rounded-full border-gray-500 cursor-pointer ${
              mode === "sell" ? activeButton : inactiveButton
            }
            ${focusStyles}`}
          >
            <IoIosCheckmark size={15} style={{ strokeWidth: "8%" }} />
          </button>
          <label className={`text-sm ${mode === "sell" ? "text-yellow-400" : ""}`}>
            Sell Order
          </label>
        </div>
        <div className="flex gap-2 py-0.5 px-2">
          <button
            className={`text-sm border-3  rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer
            ${focusStyles}`}
          >
            <IoIosCheckmark size={15} style={{ strokeWidth: "8%" }} />
          </button>
          <label className="text-sm">Buy Order</label>
        </div>
      </div>
    </>
  );
}

export default PanelActions;
