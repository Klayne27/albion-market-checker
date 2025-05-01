import { ImCross } from "react-icons/im";
import { useInventory } from "../hooks/useInventory";
import { formatNumber } from "../utils/helpers";

const TOTAL_INVENTORY_SLOTS = 48;

function Inventory() {
  const { inventory, isLoadingInv } = useInventory();

  if (isLoadingInv) return <p>Loading...</p>;

  const totalInventoryValue = inventory.inventory.reduce((acc, item) => {
    // Ensure item is not empty and has price and quantity properties
    if (!item.empty && item.price !== undefined && item.quantity !== undefined) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0); // Start the accumulation from 0

  const displayInventory = Array.from({ length: TOTAL_INVENTORY_SLOTS }).map(
    (_, index) => inventory.inventory[index] || { id: `empty-${index}`, empty: true }
  );

  return (
    <div className="border w-96 bg-[#EDC298]">
      <div className="ml-7 flex items-center gap-2 relative">
        <div className="border-3 border-[#8C7C6B] rounded-full w-17 h-17 my-2"></div>
        <img src="./avatar2.png" className="absolute size-32 -left-7.5" />
        <div className="flex flex-col just">
          <span>{inventory.username}:</span>
          <span className="text-3xl font-semibold text-[#64421e] ">Inventory</span>
        </div>
        <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] left-20 bottom-6 relative">
          <ImCross size={10} className="absolute top-1" />
        </span>
      </div>
      <div className="grid grid-cols-3 justify-center items-center mx-auto max-w-68 gap-6">
        <div className="flex flex-col gap-2">
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="flex flex-col gap-1.5">
            <div className=" text-sm">
              <span className="border rounded-full bg-[#2C2B35] border-[#646179]">
                🌕
              </span>{" "}
              100
            </div>
            <div className=" text-sm">
              <span className="border rounded-full bg-[#2C2B35] border-[#646179]">🪩</span>{" "}
              {formatNumber(inventory.silver)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="border h-18 bg-[#D4B394]"></div>
          <div className="flex flex-col gap-1.5 text-center">
            <div className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179]">
              Loadouts
            </div>
            <div className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179]">
              Wardrobe
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center  mt-1">
        <p className="text-[12px]">W: 0%</p>
        <div className="flex">
          <div className="h-2 border w-36 "></div>
          <div className="h-2 border w-13 "></div>
          <div className="h-2 border w-13 "></div>
          <div className="h-2 border w-9 "></div>
          <div className="h-2 border w-9 "></div>
        </div>
      </div>
      <div className="overflow-auto h-[25rem] custom-scrollbar mr-3">
        <div className="relative grid grid-cols-4 gap-2  border-[#8C7C6B] mt-4 mx-auto max-w-xs justify-center items-center left-3">
          {displayInventory.map((item, index) => (
            <div
              key={index}
              className={`w-18 h-18 border border-[#8C7C6B] bg-[#D4B394] ${
                item.empty ? "" : "flex items-center justify-center"
              }`}
            >
              {!item.empty && (
                <div className="text-xs text-black text-center ">
                  <p>{item.name}</p>
                  <p>x{item.quantity}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mb-1">
        <div className="text-sm">
          Est. Market Value: {formatNumber(totalInventoryValue)}
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179] w-16 text-center">
            Stack
          </span>
          <span className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179] w-16 text-center">
            Sort
          </span>
        </div>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
}

export default Inventory;
