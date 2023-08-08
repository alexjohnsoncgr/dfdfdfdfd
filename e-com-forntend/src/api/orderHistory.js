import axios from "axios";
import { API } from "../utils/config";

export const getOrderHistory = (token) => {
    return axios.get(`${API}/getOrderHistory`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}