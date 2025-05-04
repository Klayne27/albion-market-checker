import { Provider } from "react-redux";
import Inventory from "./components/Inventory";

import store from "./store";
import Shop from "./components/Shop/Shop";


function App() {
  return (
    <Provider store={store}>
      <div className="relative w-full bg-gradient-to-t from-[#212a55] via-[#181f3d] to-[#131831]">
        <div className="flex justify-around items-center w-full h-screen">
          <Shop />
          <Inventory />
        </div>
      </div>
    </Provider>
  );
}

export default App;
