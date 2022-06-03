import React from "react";

class TotalFunction {
    total(cartSession, cartItems){
        let total = 0;
        if (cartItems){
            cartItems.map(item => {
                total += item.amount * item.product.price
            })
        }
        if(cartSession && cartSession.length !== 0){
            cartSession.map(item => {
                total += item.amount * item.price
            })
        }
        return total;
    }

    totalAmount(subTotal, shipping, couponValue){
        let total
        if(couponValue !== null && couponValue.length > 0){
            total = couponValue[0]['discountType'] === "percent" ?
                subTotal - (subTotal / 100 * couponValue[0]['value']) : subTotal - couponValue[0]['value'] * 100;
        }else{
            total = subTotal
        }


        return total + shipping;
    }
}

export default TotalFunction;