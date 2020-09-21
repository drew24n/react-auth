import {loginAPI, registerAPI} from "../api/auth";
import {message} from 'antd';

const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    isAuthorized: false,
    isFetching: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const setIsAuthorizedAction = (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized})
export const setIsFetchingAction = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

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
        await loginAPI(email, password)
    } catch (e) {
        message.error(e)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}