import { TApplicationActions } from "../../types/redux-types";
import { CHECK_USER, REGISTRY_USER, LOGOUT_USER, LOGIN_USER, FIX_PASSWORD, RESET_PASSWORD, EDIT_USER } from "../actions/identification";

type TUserData = {
    email: string,
    name: string
} 

type TUserReducer = {
    userData: TUserData|null,
    isForgotPassword: boolean
}

const initialState: TUserReducer = {
    userData: null,
    isForgotPassword: false
}

export const userReducer = (state = initialState, action: TApplicationActions): TUserReducer => {
    switch(action.type) {
        case CHECK_USER: {
            return {...state, userData: action.data}
        }
        case EDIT_USER: {
            return {...state, userData: action.data}
        }
        case REGISTRY_USER: {
            return {...state, userData: action.data}
        }
        case LOGIN_USER: {
            return {...state, userData: action.data}
        }
        case LOGOUT_USER: {
            return {...state, userData: null}
        }
        case FIX_PASSWORD: {
            return {...state, isForgotPassword: true}
        }
        case RESET_PASSWORD: {
            return {...state, isForgotPassword: false}
        }
        default: {
            return state
        }
    }
}