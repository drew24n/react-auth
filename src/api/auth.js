import axios from "axios";

const instance = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/http://142.93.134.108:1111/"
})

export const authAPI = {
    register(email, password) {
        return instance.post(`sign_up`, {email, password})
    },
    login(email, password) {
        return instance.post(`login?email=${email}&password=${password}`)
    },
    auth(accessToken) {
        return instance.get(`me`, {headers: {'Authorization': 'Bearer ' + accessToken}})
    },
    refresh(refreshToken) {
        return instance.post(`refresh`, {}, {headers: {'Authorization': 'Bearer ' + refreshToken}})
    }
}