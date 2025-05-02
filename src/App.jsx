import { Provider } from "react-redux";
import Inventory from "./components/Inventory";

import Shop from "./components/Shop";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="relative w-full">
        <div className="flex justify-around items-center w-full h-screen">
          <img
            src="/bgmarket.jpeg"
            className="relative w-full flex justify-center items-start overflow-hidden"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
            alt="Background"
          />
          <Shop />
          <Inventory />
        </div>
      </div>
    </Provider>
  );
}

export default App;
