import axios from "axios";

const rootUrl = '142.93.134.108:1111'

export const register = async ({email, password}) => {
    try {
        let {data} = await axios.post(`${rootUrl}/sign_up`, {email, password})
        return {data}
    } catch (e) {
        alert(e)
    }
}

export const login = async ({email, password}) => {
    try {
        let {data} = await axios.post(`${rootUrl}/login?email=${email}&password=${password}`)
        return {data}
    } catch (e) {
        alert(e)
    }
}

export const authMe = async () => {
    try {
        let {data} = await axios.get(`${rootUrl}/me`)
        return {data}
    } catch (e) {
        alert(e)
    }
}

export const authRefresh = async () => {
    try {
        let {data} = await axios.get(`${rootUrl}/refresh`)
        return {data}
    } catch (e) {
        alert(e)
    }
}