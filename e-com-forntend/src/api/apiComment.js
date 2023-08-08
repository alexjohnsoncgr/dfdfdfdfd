import axios from "axios";
import { API } from "../utils/config";

export const newComment = (token, data) => {
    return axios.post(`${API}/comment`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })

}

export const loadComment = (id) => {
    return axios.get(`${API}/comment/${id}`)
}