function ShopSellHeader() {
  return (
    <>
      <h1 className="font-bold mb-1 text-3xl">Your Inventory</h1>

      <div className="grid grid-cols-[2fr_2fr] border rounded-xl p-1 gap-3 mr-6 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b]">
        <div className="border px-2 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
          Item
        </div>
        <div className="border px-2  rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
          Durability
        </div>
      </div>
    </>
  );
}

export default ShopSellHeader;
