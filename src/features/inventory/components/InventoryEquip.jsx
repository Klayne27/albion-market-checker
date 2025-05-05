import { useSelector } from "react-redux";
import { formatNumber } from "../../../utils/helpers";
import { ImCross } from "react-icons/im";

function InventoryEquip() {
  const { username, silver } = useSelector((state) => state.inventory);

  return (
    <>
      <div className="ml-6 flex items-center gap-2 relative mt-3">
        <div className="border-3 border-[#8C7C6B] rounded-full w-[73px] h-[73px] my-2"></div>
        <img src="./avatar2.png" className="absolute size-[138px] -left-8" />
        <div className="flex flex-col text-[22px]">
          <span>{username}:</span>

          <span className="text-3xl font-semibold text-[#64421e] ">Inventory</span>
        </div>
        <span className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] left-[44px] bottom-5 relative">
          <ImCross size={13} className="absolute top-1 left-1" />
        </span>
      </div>
      <div className="grid grid-cols-3 justify-center items-center mx-auto max-w-[240px]">
        <div className="flex flex-col">
          <EquipmentSlots digit="1" itemId="T8_BAG_INSIGHT@4?quality=5" />
          <EquipmentSlots digit="1" itemId="T8_2H_CLEAVER_HELL@4?quality=5" />
          <ConsumableSlots digit="10" itemId="T6_POTION_HEAL@3" />

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
              <span className="text-md">{formatNumber(silver)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <EquipmentSlots digit="1" itemId="T8_HEAD_PLATE_AVALON@4?quality=5" />
          <EquipmentSlots digit="1" itemId="T8_ARMOR_LEATHER_FEY@4?quality=5" />
          <EquipmentSlots digit="1" itemId="T8_SHOES_PLATE_AVALON@4?quality=5" />
          <EquipmentSlots digit="1" itemId="T8_MOUNT_MAMMOTH_BATTLE@1" />
        </div>

        <div className="flex flex-col">
          <EquipmentSlots digit="1" itemId="T8_CAPEITEM_UNDEAD@4?quality=5" />
          <EquipmentSlots
            digit="1"
            itemId="T8_2H_CLEAVER_HELL@4?quality=5"
            opacity={0.5}
          />
          <ConsumableSlots digit="10" itemId="T7_MEAL_ROAST_FISH@3?" />
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
      <Weight />
    </>
  );
}

function EquipmentSlots({ itemId, digit, opacity }) {
  return (
    <div
      className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
      style={{
        backgroundImage: `url('https://render.albiononline.com/v1/item/${itemId}')`,
        backgroundSize: "114%",
        opacity: opacity,
      }}
    >
      <p className="absolute text-white left-11 bottom-2 text-xs border-2 rounded-full px-1.5 border-gray-300 font-sans">
        {digit}
      </p>
    </div>
  );
}

function ConsumableSlots({ itemId, digit }) {
  return (
    <div
      className={`w-[70px] h-[70px] relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
      style={{
        backgroundImage: `url('https://render.albiononline.com/v1/item/${itemId}')`,
        backgroundSize: "114%",
      }}
    >
      <p className="absolute text-white left-11.5 bottom-1.5 text-xs border-2 rounded-full px-0.5 border-gray-300 font-sans">
        {digit}
      </p>
    </div>
  );
}

function Weight() {
  return (
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
  );
}

export default InventoryEquip;
