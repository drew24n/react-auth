import axios from "axios";

const rootUrl = '142.93.134.108:1111'

export const registerAPI = (email, password) => {debugger
    // axios.post(`${rootUrl}/sign_up`, {email, password})
}
export const loginAPI = (email, password) => axios.post(`${rootUrl}/login?email=${email}&password=${password}`)
export const authMeAPI = () => axios.get(`${rootUrl}/me`)
export const authRefreshAPI = () => axios.get(`${rootUrl}/refresh`)