import {CATEGORY_LIST_REQUEST, CATEGORY_LIST_ADD, CATEGORY_LIST_RECEIVED, CATEGORY_LIST_ERROR} from "../actions/constants";

export default(state = {
    categories: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
            return state;
        case CATEGORY_LIST_RECEIVED:
            state = {
                ...state,
                categories: action.data['hydra:member'],
                isFetching: false,
            };
            return state;
        case CATEGORY_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                categories: null,
            };
        case CATEGORY_LIST_ADD:
            state = {
                ...state,
                categories: state.categories ? state.categories.concat(action.data) : state.categories
            };
            return state;
        default:
            return state;
    }
}