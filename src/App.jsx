import Inventory from "./components/Inventory"
import ItemArrayDisplay from "./components/ItemArrayDisplay"
import MarketSearch from "./components/MarketSearch"
import PriceFetcher from "./components/PriceFetcher"
import Shop from "./components/Shop"


function App() {


    return (
        <>
        <MarketSearch />
        <PriceFetcher />
        <ItemArrayDisplay />
        </>
        // <div className="flex justify-around items-center mt-20">
        //     <Shop />
        //     <Inventory />
        // </div>
    )
}

export default App
