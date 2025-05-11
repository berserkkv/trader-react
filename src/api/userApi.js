import axios from "axios";

//const API = "http://193.180.208.245:8080/api/users";
const API = "http://localhost:8080/api/users";

export const getUsers = () => axios.get(API);
export const getUser = (id) => axios.get(`${API}/${id}`);
export const createUser = (user) => axios.post(API, user);
export const updateUser = (user) => axios.put(API, user);
export const deleteUser = (id) => axios.delete(`${API}/${id}`);
