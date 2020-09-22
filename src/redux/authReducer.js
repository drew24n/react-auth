import {authMeAPI, authRefreshAPI, loginAPI, registerAPI} from "../api/auth";
import {message} from 'antd';

const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_IS_INITIALIZED = "SET_IS_INITIALIZED"
const SET_TOKEN = "SET_TOKEN"

const initialState = {
    isAuthorized: false,
    isFetching: false,
    isInitialized: false,
    token: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        case SET_TOKEN:
            return {...state, token: action.token}
        default:
            return state
    }
}

const setIsAuthorizedAction = (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized})
const setIsFetchingAction = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const setTokenAction = (token) => ({type: SET_TOKEN, token})
const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized})

export const registerThunk = (email, password) => async (dispatch) => {
    dispatch(setIsFetchingAction(true))
    try {
        let response = await registerAPI(email, password)
        if (response.data.status === 'error') {
            message.error(response.data.message, 5)
        } else if (response.data.status === 'Ok') {
            message.success(response.data.message, 5)
        }
    } catch (e) {
        message.error(e.toString(), 5)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}

export const loginThunk = (email, password) => async (dispatch) => {
    dispatch(setIsFetchingAction(true))
    try {
        let response = await loginAPI(email, password)
        if (response.data.statusCode === 200) {
            localStorage.setItem('access_token', response.data.body.access_token)
            localStorage.setItem('refresh_token', response.data.body.refresh_token)
            dispatch(setTokenAction(response.data.body.access_token))
        } else if (response.data.status === 'error') {
            message.error(response.data.message, 5)
        }
    } catch (e) {
        message.error(e.toString(), 5)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}

export const authMeThunk = () => async (dispatch) => {
    try {
        let storageToken = localStorage.getItem('access_token')
        let storageRefreshToken = localStorage.getItem('refresh_token')
        if (storageToken && storageRefreshToken) {
            let response = await authMeAPI(storageToken)
            if (response.data.body.message === "token is valid") {
                dispatch(setIsAuthorizedAction(true))
            } else if (response.data.body.message === "token expired") {
                let refreshResponse = await authRefreshAPI(storageRefreshToken)
                if (refreshResponse.data.statusCode === 200) {
                    localStorage.setItem('access_token', refreshResponse.data.body.access_token)
                    localStorage.setItem('refresh_token', refreshResponse.data.body.refresh_token)
                    dispatch(setTokenAction(refreshResponse.data.body.access_token))
                    dispatch(setIsAuthorizedAction(true))
                } else dispatch(setIsAuthorizedAction(false))
            }
        } else dispatch(setIsAuthorizedAction(false))
    } catch (e) {
        message.error(e, 5)
    } finally {
        dispatch(setIsInitialized(true))
    }
}

export const logoutThunk = () => (dispatch) => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    dispatch(setTokenAction(''))
}