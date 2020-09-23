import {localStorageService} from "../localStorageService";
import {notification} from 'antd';
import {authAPI} from "../api/auth";

const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_IS_INITIALIZED = "SET_IS_INITIALIZED"

const initialState = {
    isAuthorized: false,
    isFetching: false,
    isInitialized: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

const setIsAuthorized = (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized})
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized})

const notificationError = message => notification.error({
    message: message.toString(), duration: 5, placement: 'bottomRight'
})
const notificationSuccess = message => notification.success({
    message: message.toString(), duration: 5, placement: 'bottomRight'
})

export const signup = (email, password) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        let response = await authAPI.register(email, password)
        if (response.data.status === 'Ok') {
            notificationSuccess(response.data.message)
        } else if (response.data.status === 'error') {
            notificationError(response.data.message)
        } else notificationError('Unknown error occurred')
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        let response = await authAPI.login(email, password)
        if (response.data.statusCode === 200) {
            localStorageService.setToken(response.data.body)
            await dispatch(authMe())
        } else if (response.data.code === 1012) {
            notificationError(response.data.message)
        } else if (response.data.body.code === 1001) {
            notificationError(response.data.body.message)
        } else notificationError('Unknown error occurred')
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const authMe = () => async (dispatch) => {
    try {
        let accessToken = localStorageService.getAccessToken()
        let refreshToken = localStorageService.getRefreshToken()
        if (refreshToken) {
            let response = await authAPI.auth(accessToken)
            if (response.data.body && response.data.body.status === 'ok') {
                dispatch(setIsAuthorized(true))
            } else if ((response.data.body && (response.data.body.code === 1004 || 1006)) || !accessToken.length) {
                let refreshResponse = await authAPI.refresh(refreshToken)
                if (refreshResponse.data.statusCode === 200) {
                    localStorageService.setToken(refreshResponse.data.body)
                    dispatch(setIsAuthorized(true))
                }
            }
        } else dispatch(setIsAuthorized(false))
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsInitialized(true))
    }
}

export const logout = () => (dispatch) => {
    localStorageService.clearToken()
    dispatch(authMe())
}