import axios from "axios";
import.meta.env.VITE_API_BASE_URL

const BOTS_API = "http://" +  import.meta.env.VITE_API_URL  + ":8080/api/bots";

export const getBots = () => axios.get(BOTS_API);

const ORDER_API= "http://" +  import.meta.env.VITE_API_URL  + ":8080/api/orders";

export const getOrders= () => axios.get(ORDER_API);

export const createOrder = (order) => axios.post(ORDER_API, order);
export const updateOrder = (order) => axios.put(ORDER_API, order);


const PRICE_API= "http://" +  import.meta.env.VITE_API_URL  + ":8080/api/prices";

export const getPrice= () => axios.get(PRICE_API);
