import {authMeAPI, loginAPI, registerAPI} from "../api/auth";
import {message} from 'antd';

const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_TOKEN = "SET_TOKEN"

const initialState = {
    isAuthorized: false,
    isFetching: false,
    token: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_TOKEN:
            return {...state, token: action.token}
        default:
            return state
    }
}

export const setIsAuthorizedAction = (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized})
export const setIsFetchingAction = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setTokenAction = (token) => ({type: SET_TOKEN, token})

export const registerThunk = (email, password) => async (dispatch) => {
    dispatch(setIsFetchingAction(true))
    try {
        let response = await registerAPI(email, password)
        if (response.data.status === 'error') message.error(response.data.message)
        else if (response.data.status === 'Ok') message.success(response.data.message)
    } catch (e) {
        message.error(e)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}

export const loginThunk = (email, password) => async (dispatch) => {
    dispatch(setIsFetchingAction(true))
    try {
        let response = await loginAPI(email, password)
        if (response.data.body.access_token) {
            dispatch(setTokenAction(response.data.body.access_token))
        } else if (response.data.body.status === 'error') {
            message.error(response.data.body.message)
        }
    } catch (e) {
        message.error(e)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}

export const authMeThunk = (token) => async (dispatch) => {
    try {
        let response = await authMeAPI(token)
        if (response.data.status === 'error') {
            dispatch(setIsAuthorizedAction(false))
        } else if (response.data.body.message === "token is valid") {
            dispatch(setIsAuthorizedAction(true))
        } else dispatch(setIsAuthorizedAction(false))
    } catch (e) {
        message.error(e)
    }
}

export const logoutThunk = () => (dispatch) => {
    dispatch(setTokenAction(''))
}