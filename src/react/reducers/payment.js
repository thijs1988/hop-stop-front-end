import {
    COUPON_ERROR,
    COUPON_RECEIVED,
    PAYMENT_ERROR,
    PAYMENT_RECEIVED,
    PAYMENT_REQUEST,
    PAYMENT_UNLOAD
} from "../actions/constants";


export default(state = {
    payment: null,
    isFetching: false,
    error: null,
    couponValue: null,
    couponError: null,
}, action) => {
    switch (action.type) {
        case PAYMENT_REQUEST:
            return{
                ...state,
                isFetching: true,
            };
        case PAYMENT_RECEIVED:
            return {
                ...state,
                payment: action.data,
                isFetching: false,
            };
        case PAYMENT_ERROR:
            return {
                ...state,
                isFetching: false,
                payment: null,
                error: action.error
            };
        case PAYMENT_UNLOAD:
            return {
                ...state,
                isFetching: false,
                payment: null
            }
        case COUPON_RECEIVED:
            return {
                ...state,
                isFetching: false,
                couponValue: action.data['hydra:member']
            }
        case COUPON_ERROR:
            return{
                ...state,
                isFetching: false,
                couponError: action.error.response.body['hydra:description']
        }
        default:
            return state;
    }
}