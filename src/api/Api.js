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
export const closePosition = (id) => axios.patch(BOTS_API + "/" + id + "/close_position");

const ORDER_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/orders";
export const getOrders = () => axios.get(ORDER_API);
export const createOrder = (order) => axios.post(ORDER_API, order);
export const updateOrder = (order) => axios.put(ORDER_API, order);
export const getOrdersByBotId = (botId) => axios.get(ORDER_API + "/by-bot", { params: { botId } });
export const getOrderStatistics = (botId) => axios.get(ORDER_API + "/statistics", { params: { botId } });
export const getAllOrderStatistics = () => axios.get(ORDER_API + "/statistics");


const PAIR_BOTS_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/pair_bots";
export const getPairBots = (params = {}) => {
    return axios.get(PAIR_BOTS_API, { params });
}
export const getPairBotById = (id) => axios.get(PAIR_BOTS_API + "/" + id);
export const createPairBot = (bot) => axios.post(PAIR_BOTS_API, bot);
export const stopPairBot = (id) => axios.patch(PAIR_BOTS_API + "/" + id + "/stop");
export const startPairBot = (id) => axios.patch(PAIR_BOTS_API + "/" + id + "/start");
export const closePairPosition = (id) => axios.patch(PAIR_BOTS_API + "/" + id + "/close_position");

const PAIR_ORDER_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/orders";
export const getPairOrders = () => axios.get(PAIR_ORDER_API);
export const createPairOrder = (order) => axios.post(PAIR_ORDER_API, order);
export const updatePairOrder = (order) => axios.put(PAIR_ORDER_API, order);
export const getPairOrdersByBotId = (botId) => axios.get(PAIR_ORDER_API + "/by-bot", { params: { botId } });
export const getPairOrderStatistics = (botId) => axios.get(PAIR_ORDER_API + "/statistics", { params: { botId } });
export const getAllPairOrderStatistics = () => axios.get(PAIR_ORDER_API + "/statistics");



const PRICE_API = "http://" + import.meta.env.VITE_API_URL + ":8080/api/prices";
export const getPrice = () => axios.get(PRICE_API);
