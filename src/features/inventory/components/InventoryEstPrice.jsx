import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../../utils/helpers";
import { setIsSorted } from "../slices/inventorySlice";

function InventoryEstPrice() {
  const inventory = useSelector((state) => state.inventory.inventory);
  const dispatch = useDispatch();

  const totalInventoryValue = inventory.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSortInventory = () => {
    dispatch(setIsSorted());
  };

  return (
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
  );
}

export default InventoryEstPrice;
