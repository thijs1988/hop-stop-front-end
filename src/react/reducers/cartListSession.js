import {
    ADD_PRODUCT_TO_SESSION,
    DELETE_CART_FROM_STATE,
    DELETE_PRODUCT_FROM_SESSION,
    MODIFY_SESSION
} from "../actions/constants";

let INITIAL_STATE = {
    cart: []
}

if (localStorage.getItem('cart')){
    INITIAL_STATE.cart = JSON.parse(localStorage.getItem('cart'));
} else {
    INITIAL_STATE.cart = [];
}

const cartListSession = (state = INITIAL_STATE, action) => {
    switch (action.type){
                case ADD_PRODUCT_TO_SESSION:
                    state = {
                        cart: [...action.payload]
                    }
                    return state;
                case MODIFY_SESSION:
                    state = {
                        cart: action.payload
                    }
                    return state;
                case DELETE_PRODUCT_FROM_SESSION:
                    state = {
                        cart: [...action.payload]
                    }
                    return state;
        default:
            return state;
    }
};

export default cartListSession;