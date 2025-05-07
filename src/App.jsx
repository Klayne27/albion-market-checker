import Shop from "./features/shop/components/Shop";
import Inventory from "./features/inventory/components/Inventory";

function App() {
  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-t from-[#212a55] via-[#181f3d] to-[#131831] ">
      <div className="flex justify-around w-full items-center">
        <Shop />
        <Inventory />
      </div>
    </div>
  );
}

export default App;
