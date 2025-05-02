import { ImCross } from "react-icons/im";
import { formatNumber } from "../utils/helpers";
import { useSelector } from "react-redux";
import { selectInventory } from "../inventorySlice";

const TOTAL_INVENTORY_SLOTS = 48;
const baseURLimage = "https://render.albiononline.com/v1/item/";

function Inventory() {
  const inventory = useSelector(selectInventory);

  const totalInventoryValue = inventory.inventory.reduce((acc, item) => {
    // Ensure item is not empty and has price and quantity properties
    if (!item.empty && item.price !== undefined && item.quantity !== undefined) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const displayInventory = Array.from({ length: TOTAL_INVENTORY_SLOTS }).map(
    (_, index) => inventory.inventory[index] || { id: `empty-${index}`, empty: true }
  );

  return (
    <div className="border w-96 bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966]">
      <div className="ml-7 flex items-center gap-2 relative">
        <div className="border-3 border-[#8C7C6B] rounded-full w-17 h-17 my-2"></div>
        <img src="./avatar2.png" className="absolute size-32 -left-7.5" />
        <div className="flex flex-col just">
          <span>{inventory.username}:</span>

          <span className="text-3xl font-semibold text-[#64421e] ">Inventory</span>
        </div>
        <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] left-20 bottom-6 relative">
          <ImCross size={10} className="absolute top-0.5" />
        </span>
      </div>
      <div className="grid grid-cols-3 justify-center items-center mx-auto max-w-60">
        <div className="flex flex-col gap-1">
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_BAG_INSIGHT@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_2H_CLEAVER_HELL@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T6_POTION_HEAL@3')`,
              backgroundSize: "119%",
            }}
          >
            <p className="absolute text-white left-13 bottom-2 text-xs border-3 rounded-full px-0.5 border-gray-300 font-sans">
              10
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className=" text-sm">
              <span className="border rounded-full bg-[#2C2B35] border-[#646179] mr-2">
                🌕
              </span>
              100k
            </div>
            <div className="text-sm">
              <span className="border rounded-full bg-[#2C2B35] border-[#646179]">🪩</span>{" "}
              {formatNumber(inventory.silver)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_HEAD_PLATE_AVALON@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>

          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_ARMOR_LEATHER_FEY@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_SHOES_PLATE_AVALON@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_MOUNT_MAMMOTH_BATTLE@1')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_CAPEITEM_UNDEAD@4?quality=5')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1.5 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T8_2H_CLEAVER_HELL@4?quality=5')`,
              backgroundSize: "114%",
              opacity: "50%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-1 border-gray-300 font-sans">
              1
            </p>
          </div>
          <div
            className={`w-19 h-19 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
            style={{
              backgroundImage: `url('https://render.albiononline.com/v1/item/T7_MEAL_ROAST_FISH@3?')`,
              backgroundSize: "114%",
            }}
          >
            <p className="absolute text-white left-12.5 bottom-2 text-xs border-3 rounded-full px-0.5 border-gray-300 font-sans">
              10
            </p>
          </div>
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

      <div className="flex flex-col justify-center items-center  mt-1">
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
        <div className="relative grid grid-cols-4 gap-y-1 border-[#8C7C6B] mt-4 mx-auto max-w-xs justify-center items-center left-3 ">
          {displayInventory.map((item, index) => (
            <div
              key={index}
              className={`w-19 h-19 relative ${
                item.empty
                  ? " border-[#8C7C6B] bg-[#d1ab84] shadow-[inset_0_0_15px_2px_#a78160]"
                  : "overflow-hidden bg-cover bg-center bg-no-repeat"
              }`}
              style={
                !item.empty
                  ? {
                      backgroundImage: `url('${baseURLimage}${item.id}')`,
                      backgroundSize: "114%",
                    }
                  : {}
              }
            >
              {!item.empty && (
                <p className="absolute text-white left-14 bottom-2 text-xs z-10">
                  {item.quantity}
                </p>
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
