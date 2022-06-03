import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_ADD,
    PRODUCT_LIST_RECEIVED,
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_SET_PAGE,
    FILTERED_PRODUCT_LIST_DELETED,
    COMBO_DEALS_LIST_RECEIVED,
    FEATURED_PRODUCTS_LIST_RECEIVED,
    DISCOUNT_PRODUCTS_LIST_RECEIVED,
    PRODUCT_LIST_SET_CATEGORY_PAGE, RECEIVED_ALL_PRODUCTS
} from "../actions/constants";
import {hydraPageCount} from "../../apiUtils";

export default(state = {
    min: null,
    max: null,
    order: null,
    input: null,
    products: null,
    isFetching: false,
    currentPage: 1,
    searchPage: null,
    categoryPage: null,
    pageCount: null,
    allProducts: null,
    featuredProducts: null,
    discountProducts: null,
    comboProducts: null,
}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
            return state;
        case PRODUCT_LIST_RECEIVED:
            state = {
                ...state,
                min: action.min,
                max: action.max,
                order: action.order,
                input: action.input,
                products: action.data['hydra:member'],
                pageCount: hydraPageCount(action.data),
                isFetching: false,
            };
            return state;
        case RECEIVED_ALL_PRODUCTS:
            state = {
                ...state,
                allProducts: action.data['hydra:member'],
                isFetching: false
            }
            return state;
        case COMBO_DEALS_LIST_RECEIVED:
            state = {
                ...state,
                comboProducts: state.comboProducts && state.comboProducts.length / action.page <= 12 && action.page !== 1 ? state.comboProducts.concat(action.data['hydra:member']) : action.data['hydra:member'],
                currentPage: action.page,
                pageCount: hydraPageCount(action.data),
                isFetching: false,
            }
            return state;
        case FEATURED_PRODUCTS_LIST_RECEIVED:
            state = {
                ...state,
                featuredProducts: action.data['hydra:member'],
                isFetching: false,
            }
            return state;
        case DISCOUNT_PRODUCTS_LIST_RECEIVED:
            state = {
                ...state,
                discountProducts: action.data['hydra:member'],
                isFetching: false,
            }
            return state;
        case FILTERED_PRODUCT_LIST_DELETED:
            state = {
                ...state,
                min: null,
                max: null,
                currentPage: 1,
                order: null,
                input: null
            }
            return state;
        case PRODUCT_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                products: null,
            };
        case PRODUCT_LIST_ADD:
            state = {
                ...state,
                products: state.products ? state.products.concat(action.data) : state.products
            };
            return state;
        case PRODUCT_LIST_SET_PAGE:
            return {
              ...state,
              currentPage: action.page
            };
        case PRODUCT_LIST_SET_CATEGORY_PAGE:
            return {
                ...state,
                categoryPage: action.page
            }
        default:
            return state;
    }
}