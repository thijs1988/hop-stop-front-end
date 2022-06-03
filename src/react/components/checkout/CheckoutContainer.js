import React from "react";
import {connect} from "react-redux";
import CheckoutForm from "./CheckoutForm";
import CartSummary from "./CartSummary";
import TotalFunction from "../functions/TotalFunction";
import {cartListFetch} from "../../actions/actions";


const mapStateToProps = state => ({
    ...state.cartList,
    ...state.payment,
    userData: state.auth.userData,
});

const mapDispatchToProps = {
    cartListFetch
};

class CheckoutContainer extends React.Component{
    componentDidMount() {
        const {cartListFetch} = this.props;
        const cartId = localStorage.getItem('cartId')
        if (cartId) {
            cartListFetch(cartId);
        }
    }


    render() {
        const {cartItems, couponValue, userData} = this.props;
        const cartSession = JSON.parse(localStorage.getItem('cart'));

        let totals = new TotalFunction();

        let subTotal = 0
        let shipping = 0
        let total = 0
        if(cartSession !== null || cartItems !== null){
            subTotal = totals.total(cartSession, cartItems);
            shipping = subTotal > 7500 ? 0 : 695;
            total = totals.totalAmount(subTotal, shipping, couponValue);
        }

        return (
            <div className="container">
            <CartSummary
                cartSession={cartSession}
                cartItems={cartItems}
                subtotal={subTotal}
                couponValue={couponValue}
                shipping={shipping}
                total={total}
            />
            <CheckoutForm
                cartSession={cartSession}
                cartItems={cartItems}
                subtotal={subTotal}
                total={total}
                couponValue={couponValue}
            />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);