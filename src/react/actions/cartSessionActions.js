import {ADD_PRODUCT_TO_SESSION, DELETE_PRODUCT_FROM_SESSION, MODIFY_SESSION} from "./constants";
import {requests} from "../../agent";

export const addProductToSession = (product) => {
    return dispatch => {
        //if cart already exists, use it, otherwise set to empty array
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): [];
        // check for duplicates
        const duplicates = cart.filter(cartItem => cartItem.productId === product.productId);
        // if no duplicates, proceed
        if (duplicates.length === 0){
            // prep product data
            // const productToAdd = {
            //     ...product
            // }
            // add product data to cart
            cart.push(product);
            //add cart to local storage
            localStorage.setItem('cart', JSON.stringify(cart));
            //add cart to redux
            dispatch({
                type: ADD_PRODUCT_TO_SESSION,
                payload: cart,
            });
        }else{
            //find index
            const objIndex = cart.findIndex(item => item.productId === product.productId)
            // replace index
            cart[objIndex]['amount'] = (parseInt(product.amount) + parseInt(cart[objIndex]['amount']))
            // add cart to localstorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // add cart to redux
            dispatch({
                type: ADD_PRODUCT_TO_SESSION,
                payload: cart,
            })
        }
    }
};

export const updateAmountFromSession = (cartSession) => {
    return dispatch => {
        dispatch({
            type: MODIFY_SESSION,
            payload: cartSession,
        })
    }
}

export const deleteProductFromSession = (product) => {
    return dispatch => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        const updatedCart = cart.filter(cartItem => cartItem.productId !== product.productId);

        localStorage.setItem('cart', JSON.stringify(updatedCart));

        dispatch({
            type: DELETE_PRODUCT_FROM_SESSION,
            payload: updatedCart
        })
    }
}