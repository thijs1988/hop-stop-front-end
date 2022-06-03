import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_PASSWORD_UPDATED,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_UPDATED,
    USER_SET_ID, USER_UPDATE_ERROR
} from "../actions/constants";

export default (state = {
    token: null,
    userId: null,
    isAuthenticated: false,
    userData: null,
    error: null,
    success: null
}, action) => {
    switch (action.type){
        case USER_LOGIN_SUCCESS:
            return {
               ...state,
               token: action.token,
               userId: action.userId,
                isAuthenticated: true
           };
        case USER_SET_ID:
            return {
                ...state,
                userId: action.userId,
                isAuthenticated: true
            }
        case USER_PROFILE_RECEIVED:
            return {
                ...state,
                userData: (state.userId === action.userId && state.userData === null)
                    ? action.userData : state.userData,
                isAuthenticated: (state.userId === action.userId && state.userData === null)
            };
        case USER_PROFILE_UPDATED:
            return {
                ...state,
                userData: action.userData,
                isAuthenticated: (state.userId === action.userId),
                success: action.success,
                error: null
            }
        case USER_PASSWORD_UPDATED:
            return {
                ...state,
                isAuthenticated: true,
                success: action.success,
                error: null
            }
        case USER_UPDATE_ERROR:
            return {
                ...state,
                error: action.error,
                success: null
            }
        case USER_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                isAuthenticated: false,
                userData: null
            };
        default:
            return state;
    }
}