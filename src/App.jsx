
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getOrders, getBots } from "./api/Api";
import OrderList from "./components/OrderList";
import BotList from "./components/BotList";
import BotInfo from "./components/BotInfo";
import AddBotForm from "./components/AddBotForm";
import Chart from "./components/Chart";
import AllChart from "./components/AllChart";
import PairBotList from "./components/pairTrade/PairBotList";
import PairBotInfo from "./components/pairTrade/PairBotInfo";

function App() {





  return (
    <Router>
      <div className="">
        <Routes>
          <Route
            path="/"
            element={
              <>

                <div className="">
                  {/* Left Side - Links */}
                  <div className="flex">
                    <a href="/bots/create" className="text-blue-500 mr-3 hover:underline block">Create new bot</a>
                    <a href="/statistics" className="text-blue-500 hover:underline block">Statistics</a>
                  </div>

                  {/* Center - BotList */}
                  <div >
                    <PairBotList />
                    {/* <BotList /> */}

                  </div>
                </div>




              </>
            }
          />
          <Route path="/statistics" element={<AllChart />} />
          <Route path="/bots/create" element={<AddBotForm />} />
          <Route path="/bots/:id" element={<BotInfo />} />
          <Route path="/pair_bots/:id" element={<PairBotInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
