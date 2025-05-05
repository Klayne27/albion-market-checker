import { useSelector } from "react-redux";

const TOTAL_INVENTORY_SLOTS = 48;
const baseURLimage = "https://render.albiononline.com/v1/item/";

function InventorySlots() {
  const inventory = useSelector((state) => state.inventory.inventory);
  const isSorted = useSelector((state) => state.inventory.isSorted);

  const sortedInventory = isSorted
    ? [...inventory].sort((a, b) => a.id.localeCompare(b.id))
    : inventory;

  const displayInventory = Array.from({ length: TOTAL_INVENTORY_SLOTS }).map(
    (_, index) => sortedInventory[index] || { id: `empty-${index}`, empty: true }
  );

  return (
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
  );
}

export default InventorySlots;
