import axios from "axios";
import.meta.env.VITE_API_BASE_URL

const API = "http://" +  import.meta.env.VITE_API_URL  + ":8080/api/users";
//const API = "http://localhost:8080/api/users";

export const getUsers = () => axios.get(API);
export const getUser = (id) => axios.get(`${API}/${id}`);
export const createUser = (user) => axios.post(API, user);
export const updateUser = (user) => axios.put(API, user);
export const deleteUser = (id) => axios.delete(`${API}/${id}`);
