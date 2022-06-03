import {requests} from "../../agent";
import {
    CATEGORY_LIST_ERROR,
    CATEGORY_LIST_RECEIVED,
    CATEGORY_LIST_REQUEST,
    PRODUCT_ERROR,
    PRODUCT_LIST_ADD,
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_RECEIVED,
    PRODUCT_LIST_REQUEST,
    PRODUCT_RECEIVED,
    PRODUCT_REQUEST,
    PRODUCT_UNLOAD,
    USER_LOGIN_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_SET_ID,
    CART_LIST_REQUEST,
    CART_LIST_ERROR,
    CART_LIST_RECEIVED,
    CART_PRODUCT_ADDED,
    CART_PRODUCT_ADDED_ERROR,
    USER_LOGOUT,
    PRODUCT_LIST_SET_PAGE,
    CART_LIST_UNLOAD,
    USER_REGISTER_SUCCESS,
    USER_CONFIRMATION_SUCCESS,
    USER_REGISTER_COMPLETE,
    CART_PRODUCT_DELETED,
    CART_PRODUCT_UPDATED,
    FILTERED_PRODUCT_LIST_DELETED,
    USER_PROFILE_UPDATED,
    USER_PASSWORD_UPDATED,
    USER_UPDATE_ERROR,
    COMBO_DEALS_LIST_RECEIVED,
    FEATURED_PRODUCTS_LIST_RECEIVED,
    DISCOUNT_PRODUCTS_LIST_RECEIVED, PRODUCT_LIST_SET_CATEGORY_PAGE, RECEIVED_ALL_PRODUCTS,
} from "./constants";
import {SubmissionError} from "redux-form";
import {
    linkBuilder,
    parse_db_errors,
    parseApiErrors,
    parseDbErrors,
    parseErrors, parseLoginErrors,
    parseUpdateErrors
} from "../../apiUtils";
import {deleteProductFromSession} from "./cartSessionActions";

export const productListRequest = () => ({
    type: PRODUCT_LIST_REQUEST,
});

export const productListError = (error) => ({
    type: PRODUCT_LIST_ERROR,
    error
});

export const productListReceived = (data, category, min, max, order, input) => ({
    type: PRODUCT_LIST_RECEIVED,
    data,
    category,
    min,
    max,
    order,
    input
});

export const productListSetPage = (page) => ({
    type: PRODUCT_LIST_SET_PAGE,
    page
});

export const productListSetCategoryPage = (page) => ({
    type: PRODUCT_LIST_SET_CATEGORY_PAGE,
    page
});

export const productListFetch = (category, page = 1, min, max, order, input) => {
    return (dispatch) =>{
        dispatch(productListRequest())
        const link = linkBuilder(category, page, min, max, order, input)
        return requests.get(link,false)
            .then(response => dispatch(productListReceived(response, category, min, max, order, input)))
            .catch(error => console.log(error.response));
    }
};

export const receivedAllProducts = (data) => ({
    type: RECEIVED_ALL_PRODUCTS,
    data
})

export const fetchAllProducts = () => {
    return (dispatch) => {
        dispatch(productListRequest())
        return requests.get('/products?pagination=false', false)
            .then(response => dispatch(receivedAllProducts(response)))
            .catch(error => console.log(error.response))
    }
}

export const comboDealsReceived = (data, page) => ({
    type: COMBO_DEALS_LIST_RECEIVED,
    data,
    page
})

export const comboDealsFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(productListRequest())
        return requests.get(`/products?page=${page}&comboDeal=1&inventory[gt]=0&itemsPerPage=12`)
            .then(response => dispatch(comboDealsReceived(response, page)))
            .catch(error => console.log(error.response))
    }
}

export const featuredProductsReceived = (data) => ({
    type: FEATURED_PRODUCTS_LIST_RECEIVED,
    data
})

export const featuredProductsFetch = () => {
    return (dispatch) => {
        return requests.get('/products?featured=1&pagination=false')
            .then(response => dispatch(featuredProductsReceived(response)))
            .catch(error => console.log(error.response))
    }
}

export const discountProductsReceived = (data) => ({
    type: DISCOUNT_PRODUCTS_LIST_RECEIVED,
    data
})

export const discountProductsFetch = () => {
    return (dispatch) => {
        return requests.get('/products?offer=1&pagination=false')
            .then(response => dispatch(discountProductsReceived(response)))
            .catch(error => console.log(error.response))
    }
}

export const deleteFilters = () => ({
    type:  FILTERED_PRODUCT_LIST_DELETED
})

export const filteredProductsListDelete = (category) =>{
    return dispatch => {
        dispatch(deleteFilters())
        dispatch(productListFetch(category, 1,null, null, null, null))
    }
}

export const productRequest = () => ({
    type: PRODUCT_REQUEST
});

export const productError = (error) => ({
    type: PRODUCT_ERROR,
    error
});

export const productReceived = (data) => ({
    type: PRODUCT_RECEIVED,
    data
});

export const productUnload = () => ({
    type: PRODUCT_UNLOAD
});

export const productFetch = (id) => {
    return (dispatch) =>{
        dispatch(productRequest())
        return requests.get(`/products/${id}`)
            .then(response => dispatch(productReceived(response)))
            .catch(error => dispatch(productError(error)));
    }
}

export const productAdd = () => ({
    type: PRODUCT_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'A newly added product'
    }
});

export const categoryListRequest = () => ({
    type: CATEGORY_LIST_REQUEST,
});

export const categoryListError = (error) => ({
    type: CATEGORY_LIST_ERROR,
    error
});

export const categoryListReceived = (data) => ({
    type: CATEGORY_LIST_RECEIVED,
    data
});

export const categoryListFetch = () => {
    return (dispatch) =>{
        dispatch(categoryListRequest())
        return requests.get('/categories?order[parent]=asc')
            .then(response => dispatch(categoryListReceived(response)))
            .catch(error => dispatch(categoryListError(error)));
    }
};

export const userLoginSuccess = (token, userId, cartId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId,
        cartId
    }
};

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', {username, password}, false).then(
            response => {
                dispatch(userLoginSuccess(response.token, response.id, response.cartId))
                const sessionCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
                if (sessionCart && sessionCart.length !== 0){
                    sessionCart.forEach(item =>{
                        dispatch(productAddToCart(item.amount, '/api/carts/'+response.cartId, item, sessionCart))
                        dispatch(deleteProductFromSession(item))
                    })
                }
            }
        ).catch((error) => {
            throw new SubmissionError(parseLoginErrors(error))
        });
    }
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
};

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    }
};

export const userRegister = (username, name, email, password, retypedPassword, age, phoneNumber, postbox, place, street) => {
    if (!age){
        age = 0;
    }
    return (dispatch) => {
        return requests.post('/users', {
            username: username,
            password: password,
            retypedPassword: retypedPassword,
            name: name,
            email: email,
            age: parseInt(age),
            phoneNumber: phoneNumber,
            postbox: postbox,
            place: place,
            street: street
        }, false)
            .then(()=> dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(parseErrors(error));
            });
    }
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
};

export const userRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
};

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return requests.post('/users/confirm', {confirmationToken}, false)
            .then(()=> dispatch(userConfirmationSuccess()))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Confirmation token is invalid'
                });
            });
    }
};

export const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST,
});

export const userProfileError = (userId) => ({
    type: USER_PROFILE_ERROR,
    userId
});

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
};

export const userProfileReceived = (userId, userData) => ({
    type: USER_PROFILE_RECEIVED,
    userId,
    userData
});

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId, response))
        ).catch(() => dispatch(userProfileError(userId)))
    }
};

export const userProfileUpdated = (userId, userData, success) => ({
    type: USER_PROFILE_UPDATED,
    userId,
    userData,
    success
})

export const userUpdateError = (error) => ({
    type: USER_UPDATE_ERROR,
    error
})

export const userProfileUpdate = (name, username, email, phoneNumber, street, place, postbox, age, userId) => {
    const success = "Profile is updated";
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.put(`/users/${userId}`, {
            name: name,
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            street: street,
            place: place,
            postbox: postbox,
            age: parseInt(age),
        },true).then(
            response => dispatch(userProfileUpdated(userId, response, success))
        ).catch(
            error => {
                dispatch(userUpdateError(parseUpdateErrors(error)));
            }
        )
    }
}

export const userPasswordUpdated = (userId, userData, success) => ({
    type: USER_PASSWORD_UPDATED,
    userId,
    userData,
    success
})

export const userPasswordError = (error) => ({
    type: USER_UPDATE_ERROR,
    error,
})

export const userPasswordUpdate = (data, userId) => {
    const success = "Password is updated"
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.patch(`/users/${userId}/reset-password`, {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            newRetypedPassword: data.newRetypedPassword
        }, true).then(response =>
            dispatch(userPasswordUpdated(userId, response, success))
        ).catch(
            error => dispatch(userPasswordError(error.response.body['hydra:description']))
        )
    }
}

export const cartListRequest = () => ({
    type: CART_LIST_REQUEST,
});

export const cartListError = (error) => ({
    type: CART_LIST_ERROR,
    error
});

export const cartListReceived = (data, page) => ({
    type: CART_LIST_RECEIVED,
    data,
    page
});

export const cartListUnload = () => ({
   type: CART_LIST_UNLOAD
});

export const cartListFetch = (cartId, page = 1) => {
    return (dispatch) =>{
        dispatch(cartListRequest())
        return requests.get(`/cartproducts?cart=${cartId}&pagination=false`, true)
            .then(response => dispatch(cartListReceived(response, page)))
            .catch(error => dispatch(cartListError(error)));
    }
};

export const cartProductDeleted = (item) => ({
    type: CART_PRODUCT_DELETED,
    item
});

export const cartProductDelete = (item) => {
    return (dispatch) => {
        return requests.delete(`${item['@id'].slice(4, item.length)}`, false)
            .then(response => dispatch(cartProductDeleted(item)))
            .catch(error => console.log(error.response));
    }

};

export const cartProductUpdated = (item) => ({
    type: CART_PRODUCT_UPDATED,
    item
});


export const cartProductPatch = (amount, item) => {
    return (dispatch) => {
        return requests.patch(`${item['@id'].slice(4, item['@id'].length)}`, {
            amount: parseInt(amount)
        }, true)
            .then(response => dispatch(cartProductUpdated(response)))
            .catch(error => console.log(error));
    }

};

export const productAddedToCart = (cart, exists) => ({
    type: CART_PRODUCT_ADDED,
    cart,
    exists
});

export const cartProductAddedError = (error) => ({
    type: CART_PRODUCT_ADDED_ERROR,
    error
});

export const productAddToCart = (amount, cart, product, cartItems) => {
    return (dispatch) =>{
        const exists = product['@id'] ? cartItems.filter(item => item.product['@id']  === product['@id']) : cartItems.filter(item => item.productId  === product.productId);
        let check = "amount"+product.id;
        return requests.post(
            '/cartproducts',
            {
                amount: parseInt(amount),
                price: parseFloat(product.price),
                product: product['@id'] ? product['@id'] : product.productId,
                cart: cart
                }
            ).then(
                response => dispatch(productAddedToCart(response, exists))
            ).catch(error => {
                // if (401 === error.response.data){
                //    return dispatch(userLogout());
                // }
                if(error.response.body.violations){
                    throw new SubmissionError(parseApiErrors(error, check))
                }else{
                    throw new SubmissionError(parseDbErrors(error, check))
                }
            })
    }
};

export const transactionAdd = (name, email, postbox, street, phoneNumber, place, cartId, amount, cartSession, couponId) => {
    let country = 'nl';
    return (dispatch) =>{
        return requests.post(
            '/transactions',
            {
                name,
                email,
                postbox,
                street,
                phoneNumber,
                place,
                cartId: cartId !== null ? parseInt(cartId) : 0,
                amount: parseInt(amount * 100),
                country: country,
                items: cartId === null && cartSession !== null ? JSON.stringify(cartSession) : null,
                coupon: couponId
            }
        ).catch(error => {
            // if (401 === error.response.data){
            //    return dispatch(userLogout());
            // }
            if(error.response.body.violations){
                throw new SubmissionError(parseErrors(error))
            }else{
                throw new SubmissionError({
                    _error: 'something went wrong'
                })
            }
        })
    }
};