import InventoryEquip from "./InventoryEquip";
import InventorySlots from "./InventorySlots";
import InventoryEstPrice from "./InventoryEstPrice";

function Inventory() {
  return (
    <div className="border w-[360px] bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966] mt-8">
      <InventoryEquip />
      <InventorySlots />
      <InventoryEstPrice />
    </div>
  );
}

export default Inventory;
