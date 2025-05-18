import { useEffect, useState } from "react";
import { getOrders, getBots} from "./api/Api";
import OrderList from "./components/OrderList";
import BotList from "./components/BotList";

function App() {
  const [orders, setOrders] = useState([]);
  const [bots, setBots] = useState([]);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };
  const fetchBots = async () => {
    const res = await getBots();
    setBots(res.data);
  };


  useEffect(() => {
    fetchOrders();
    fetchBots();
  }, []);
 

  return (
    <div>
      <BotList bots={bots}/>
      <OrderList orders={orders}/>

    </div>

    
  );
}

export default App;
