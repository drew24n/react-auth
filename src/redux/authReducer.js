import {loginAPI, registerAPI} from "../api/auth";

const SET_EMAIL = "SET_EMAIL"
const SET_PASSWORD = "SET_PASSWORD"
const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    email: '',
    password: '',
    isAuthorized: false,
    isFetching: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return {...state, email: action.email}
        case SET_PASSWORD:
            return {...state, password: action.password}
        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const setEmailAction = (email) => ({type: SET_EMAIL, email})
export const setPasswordAction = (password) => ({type: SET_PASSWORD, password})
export const setIsAuthorizedAction = (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized})
export const setIsFetchingAction = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

export const registerThunk = (email, password) => async (dispatch) => {
    dispatch(setIsFetchingAction(true))
    try {
        await registerAPI(email, password)
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setIsFetchingAction(false))
        dispatch(setEmailAction(''))
        dispatch(setPasswordAction(''))
    }
}

export const loginThunk = (email, password) => async (dispatch) => {
    dispatch(setIsFetchingAction(true))
    try {
        await loginAPI(email, password)
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}