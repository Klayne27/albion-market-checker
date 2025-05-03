import { ImCross } from "react-icons/im";
import { formatNumber } from "../utils/helpers";
import { useSelector } from "react-redux";
import { selectInventory } from "../slices/inventorySlice";
import { useState } from "react";

const TOTAL_INVENTORY_SLOTS = 48;
const baseURLimage = "https://render.albiononline.com/v1/item/";

function Inventory() {
  const inventory = useSelector(selectInventory);

  const [isSorted, setIsSorted] = useState(false);

  const totalInventoryValue = inventory.inventory.reduce((acc, item) => {
    if (!item.empty && item.price !== undefined && item.quantity !== undefined) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const sortedInventory = isSorted
    ? [...inventory.inventory].sort((a, b) => a.id.localeCompare(b.id))
    : inventory.inventory;

  const displayInventory = Array.from({ length: TOTAL_INVENTORY_SLOTS }).map(
    (_, index) => sortedInventory[index] || { id: `empty-${index}`, empty: true }
  );

  const handleSortInventory = () => {
    setIsSorted((sort) => !sort);
  };

  return (
    <div className="border w-[360px] bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966]">
      <div className="ml-6 flex items-center gap-2 relative mt-3">
        <div className="border-3 border-[#8C7C6B] rounded-full w-[73px] h-[73px] my-2"></div>
        <img src="./avatar2.png" className="absolute size-[138px] -left-8" />
        <div className="flex flex-col text-[22px]">
          <span>{inventory.username}:</span>

          <span className="text-3xl font-semibold text-[#64421e] ">Inventory</span>
        </div>
        <span className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] left-[44px] bottom-5 relative">
          <ImCross size={13} className="absolute top-1 left-1" />
        </span>
      </div>
      <div className="grid grid-cols-3 justify-center items-center mx-auto max-w-[240px]">
        <div className="flex flex-col">
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_BAG_INSIGHT@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_2H_CLEAVER_HELL@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T6_POTION_HEAL@3')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11.5 bottom-1.5 text-xs border-2 rounded-full px-0.5 border-gray-300 font-sans">
              10
            </p>
          </div>
          <div className="flex flex-col gap-1.5 mt-1.5">
            <div className=" text-sm">
              <span className="border rounded-full bg-[#2C2B35] border-[#646179] mr-2 text-md">
                🌕
              </span>
              <span className="text-md">10.0b</span>
            </div>
            <div className="text-sm">
              <span className="border rounded-full bg-[#2C2B35] border-[#646179] text-md">
                🪩
              </span>{" "}
              <span className="text-md">{formatNumber(inventory.silver)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_HEAD_PLATE_AVALON@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>

          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_ARMOR_LEATHER_FEY@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_SHOES_PLATE_AVALON@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_MOUNT_MAMMOTH_BATTLE@1')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_CAPEITEM_UNDEAD@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_2H_CLEAVER_HELL@4?quality=5')`,
              backgroundSize: "114%",
              opacity: "50%",
            }}
          ></div>
          <div
            className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T7_MEAL_ROAST_FISH@3?')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-11.5 bottom-1.5 text-xs border-2 rounded-full px-0.5 border-gray-300 font-sans">
              10
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-center mt-1">
            <div className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179]">
              Loadouts
            </div>
            <div className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179] px-1">
              Wardrobe
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-1">
        <p className="text-md text-center">W: 0%</p>
        <div className="flex ml-5">
          <div className="h-2 border w-34 "></div>
          <div className="h-2 border w-11 "></div>
          <div className="h-2 border w-11 "></div>
          <div className="h-2 border w-8 "></div>
          <div className="h-2 border w-8 "></div>
        </div>
      </div>
      <div className="overflow-auto h-[396px] custom-scrollbar mr-4">
        <div className="relative grid grid-cols-4 gap-y-[3px] border-[#8C7C6B] mt-4 mx-auto max-w-[365px] justify-center items-center left-5 mr-10">
          {displayInventory.map((item, index) => (
            <div
              key={index}
              className={`w-[70px] h-[70px] relative ${
                item.empty
                  ? " border-[#8C7C6B] bg-[#d1ab84] shadow-[inset_0_0_15px_2px_#a78160]"
                  : "overflow-hidden bg-cover bg-center bg-no-repeat"
              }`}
              style={
                !item.empty
                  ? {
                      backgroundImage: `url('${baseURLimage}${item.id}?quality=${item.quality}')`,
                      backgroundSize: "114%",
                    }
                  : {}
              }
            >
              {!item.empty && (
                <p className="absolute text-white left-13.5 bottom-2 text-[9px] z-10">
                  {item.quantity}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mb-2 mt-2">
        <div className="text-md">
          <span className="text-xs">Est. Market Value:</span>🪩
          {formatNumber(totalInventoryValue)}
        </div>
        <div className="flex items-center justify-center gap-1">
          <button className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179] w-14 text-center cursor-pointer">
            Stack
          </button>
          <button
            className="border rounded-full text-sm bg-[#2C2B35] text-yellow-400 border-[#646179] w-14 text-center cursor-pointer"
            onClick={handleSortInventory}
          >
            Sort
          </button>
        </div>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
}

export default Inventory;
