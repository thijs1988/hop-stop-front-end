import {USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR} from "./react/actions/constants";
import {requests} from "./agent";
import {userLogout} from "./react/actions/actions";

export const tokenMiddleware = store => next => action=> {
    switch(action.type){
        case USER_LOGIN_SUCCESS:
            window.localStorage.setItem('jwtToken', action.token);
            window.localStorage.setItem('userId', action.userId);
            window.localStorage.setItem('cartId', action.cartId);
            requests.setToken(action.token);
            break;
        case USER_LOGOUT:
            window.localStorage.removeItem('jwtToken');
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('cartId');
            requests.setToken(null);
            break;
        case USER_PROFILE_ERROR:
            const state = store.getState().auth;
            if(state.userId === action.userId && state.userData === null){
                store.dispatch(userLogout());
            }
            break;
        default:
    }
    next(action);
}