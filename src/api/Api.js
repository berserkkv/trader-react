import axios from "axios";
import.meta.env.VITE_API_BASE_URL

const BOTS_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/bots";
export const getBots = (params = {}) => {
    return axios.get(BOTS_API, { params });
}
export const getBotById = (id) => axios.get(BOTS_API + "/" + id);
export const createBot = (bot) => axios.post(BOTS_API, bot);
export const stopBot = (id) => axios.patch(BOTS_API + "/" + id + "/stop");
export const startBot = (id) => axios.patch(BOTS_API + "/" + id + "/start");
export const getBotsStatistics = () => axios.get(BOTS_API + "/" + "statistics");


const ORDER_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/orders";
export const getOrders = () => axios.get(ORDER_API);
export const createOrder = (order) => axios.post(ORDER_API, order);
export const updateOrder = (order) => axios.put(ORDER_API, order);
export const getOrdersByBotId = (botId) => axios.get(ORDER_API + "/by-bot", { params: { botId } });
export const getOrderStatistics = (botId) => axios.get(ORDER_API + "/statistics", { params: { botId } });



const PRICE_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/prices";
export const getPrice = () => axios.get(PRICE_API);
