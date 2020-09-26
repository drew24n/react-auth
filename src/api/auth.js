import axios from "axios";
import {localStorageService} from "../localStorageService";
import {setIsAuthorized} from "../redux/authReducer";

const accessToken = localStorageService.getAccessToken()
const refreshToken = localStorageService.getRefreshToken()

const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://142.93.134.108:1111/'
})

instance.interceptors.request.use(request => {
    if (request.url === 'me') {
        request.headers['Authorization'] = 'Bearer ' + accessToken
    }
    return request
}, error => Promise.reject(error))

instance.interceptors.response.use(async response => {
    const originalRequest = response.config
    if (response.data.body && response.data.body.status === 'ok' && originalRequest.url === 'me') {
        global.store.dispatch(setIsAuthorized(true))
        return response
    } else if ((response.data.body && (response.data.body.code === 1004 || 1006) && originalRequest.url === 'me')
        || !accessToken.length) {
        let res = await authAPI.refresh()
        if (res.data.statusCode === 200) {
            localStorageService.setToken(res.data.body)
            instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken()
            global.store.dispatch(setIsAuthorized(true))
            return response
        }
    } else global.store.dispatch(setIsAuthorized(false))
}, error => Promise.reject(error))

export const authAPI = {
    register(email, password) {
        return axios.post(`${instance.defaults.baseURL}sign_up`, {email, password})
    },
    login(email, password) {
        return axios.post(`${instance.defaults.baseURL}login?email=${email}&password=${password}`)
    },
    auth() {
        return instance.get(`me`)
    },
    refresh() {
        return axios.post(`${instance.defaults.baseURL}refresh`, {},
            {headers: {'Authorization': 'Bearer ' + refreshToken}})
    }
}