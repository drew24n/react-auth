import axios from "axios";

export const instance = axios.create({
    baseURL: "http://142.93.134.108:1111/"
})

export const registerAPI = (email, password) => instance.post(`sign_up`, {email, password})
export const loginAPI = (email, password) => instance.post(`login?email=${email}&password=${password}`)
export const authMeAPI = () => instance.get(`me`)
export const authRefreshAPI = () => instance.get(`refresh`)