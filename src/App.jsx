import { Provider } from "react-redux";
import Inventory from "./components/Inventory";

import Shop from "./components/Shop";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="relative w-full h-screen bg-neutral-900">
        <div className="flex justify-around items-center w-full h-screen">
          <Shop />
          <Inventory />
        </div>
      </div>
    </Provider>
  );
}

export default App;
