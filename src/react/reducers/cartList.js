import {
    CART_LIST_REQUEST,
    CART_LIST_RECEIVED,
    CART_LIST_ERROR,
    CART_PRODUCT_ADDED,
    CART_LIST_UNLOAD,
    CART_PRODUCT_DELETED,
    CART_PRODUCT_UPDATED
} from "../actions/constants";
import {hydraPageCount} from "../../apiUtils";

export default(state = {
    cartItems: null,
    cartItemsAll: null,
    isFetching: false,
    currentPage: 1,
    totalItems: null,
    pageCount: null,
    error: null
}, action) => {
    switch (action.type) {
        case CART_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
            return state;
        case CART_LIST_RECEIVED:
            state = {
                ...state,
                cartItems: action.data['hydra:member'],
                totalItems: action.data['hydra:totalItems'],
                isFetching: false,
                currentPage: action.page,
                pageCount: hydraPageCount(action.data)
            };
            return state;
        case CART_PRODUCT_ADDED:
            state = {
                ...state,
                cartItems: state.cartItems ? state.cartItems.concat(action.cart) : state.cartItems,
                totalItems: action.exists.length >= 1 ? state.totalItems : state.totalItems + 1,
            }
            return state;
        case CART_PRODUCT_UPDATED:
            delete action.item['@context'];
            let objIndex = state.cartItems.findIndex((obj => obj['@id'] === action.item['@id']));
            state.cartItems[objIndex] = action.item;
            state = {
                ...state,
                ...state.cartItems,
            }
            return state;
        case CART_PRODUCT_DELETED:
            state = {
                ...state,
                cartItems: state.cartItems.filter((item) => item['@id'] !== action.item['@id']),
                totalItems: state.totalItems - 1
            }
            return state;
        case CART_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                cartItems: null,
            };
            return state;
        case CART_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                cartItems: null,
                currentPage: 1,
                pageCount: null
            }
        default:
            return state;
    }
}