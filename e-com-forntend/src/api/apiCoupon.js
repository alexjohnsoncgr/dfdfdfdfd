import { API } from "../utils/config";
import axios from "axios";

export const postNewCoupon = (token, data) => {
    return axios.post(`${API}/coupon`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const getAllCoupon = (token) => {
    return axios.get(`${API}/coupon`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const couponDelete = (token, data) => {
    return axios.delete(`${API}/coupon/${data}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const saveCoupon = (token, data) => {
    return axios.post(`${API}/coupon/saveCoupon`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}