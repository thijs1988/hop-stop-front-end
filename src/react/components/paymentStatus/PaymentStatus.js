import React from "react";
import {Link} from "react-router-dom";

class PaymentStatus extends React.Component {
    render() {
        const {payment} = this.props;

        let message
        if (payment === null){
            message = 'There is no transaction'
        }else{
        switch(payment.status) {
            case 'open':
                message = 'Your payment status is "open" you will receive a confirmation email once it has been "paid"'
                break;
            case 'paid':
                localStorage.removeItem('cart')
                message = 'Thank you for your order '+payment.name+', you have received a confirmation email("Check your spam if you can\'t find it")! "'+payment['@id'].slice(18, payment['@id'].length)+'" is your order number.'
                break;
            case 'failed':
                message = 'Your payment has failed, please check your bank account and try again'
                break;
            case 'canceled':
                message = 'Your payment was canceled, please try again'
                break;
            case 'pending':
                message = 'Your payment status is "pending" you will receive a confirmation email once it has been "paid"'
                break;
            case 'expired':
                message = 'Your payment session has "expired", please try again'
                break;
            }
        }
        return (
            <section id="cart-bottom" className="container payment-status-container">
                <div className="total payment-status">
                    <div>
                        <h5 className="text-center">PAYMENT STATUS</h5>
                        <h3 className="text-center no-cart-items">
                            {message}
                        </h3>
                    </div>
                </div>
            </section>
        )
    }
}

export default PaymentStatus;