import {requests} from "../../agent";
import {
    COUPON_ERROR,
    COUPON_RECEIVED,
    PAYMENT_ERROR,
    PAYMENT_RECEIVED,
    PAYMENT_REQUEST,
    PAYMENT_UNLOAD
} from "./constants";

export const paymentRequest = () => ({
   type: PAYMENT_REQUEST
});

export const paymentReceived = (data) => ({
    type: PAYMENT_RECEIVED,
    data
})

export const paymentError = (error) => ({
    type: PAYMENT_ERROR,
    error
})

export const paymentUnload = () => ({
    type: PAYMENT_UNLOAD
})

export const fetchPaymentDetails = (id) => {
    return dispatch => {
        dispatch(paymentRequest())
        return requests.get(`/transactions/${id}`, true)
            .then(response => dispatch(paymentReceived(response)))
            .catch(error => dispatch(paymentError(error)))
    }
}

export const couponError = (error) => ({
    type: COUPON_ERROR,
    error
})

export const couponReceived = (data) => ({
    type: COUPON_RECEIVED,
    data
})

export const fetchCouponDetails = (coupon) => {
    const dateTime = new Date().toLocaleString()
    return dispatch => {
        dispatch(paymentRequest())
        return requests.get(`/coupons?coupon=${coupon}&valid=1&expireDate[after]=${dateTime}`, false)
            .then(response => dispatch(couponReceived(response)))
            .catch(error => dispatch(couponError(error)))
    }
}