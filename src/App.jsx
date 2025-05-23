import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getOrders, getBots } from "./api/Api";
import OrderList from "./components/OrderList";
import BotList from "./components/BotList";
import BotInfo from "./components/BotInfo";
import AddBotForm from "./components/AddBotForm";

function App() {
  const [bots, setBots] = useState([]);


  const fetchBots = async () => {
    const res = await getBots();
    setBots(res.data);
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <a href="/bots/create" className="text-blue-500 hover:underline">Create new bot</a>

                <BotList bots={bots} />
              </>
            }
          />
          <Route path="/bots/create" element={<AddBotForm />} />
          <Route path="/bots/:id" element={<BotInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
