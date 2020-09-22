import axios from "axios";

export const instance = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/http://142.93.134.108:1111/"
    //добавил к базовому урлу прокси, т.к. деплой на github не работает с незащищенным http прококолом
})

export const registerAPI = (email, password) => instance.post(`sign_up`, {email, password})
export const loginAPI = (email, password) => instance.post(`login?email=${email}&password=${password}`)
export const authMeAPI = (token) => instance.get(`me`, {headers: {'Authorization': 'Bearer ' + token}})
export const authRefreshAPI = (token) => {
    return instance.post(`refresh`, {}, {headers: {'Authorization': 'Bearer ' + token}})
}