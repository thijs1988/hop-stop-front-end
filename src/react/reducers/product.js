import {PRODUCT_REQUEST, PRODUCT_RECEIVED, PRODUCT_ERROR, PRODUCT_UNLOAD} from "../actions/constants";

export default(state = {
    product: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return{
                ...state,
                isFetching: true,
            };
        case PRODUCT_RECEIVED:
            return {
                ...state,
                product: action.data,
                isFetching: false,
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                isFetching: false,
                product: null,
            };
        case PRODUCT_UNLOAD:
            return {
               ...state,
               isFetching: false,
               product: null
            }
        default:
            return state;
    }
}