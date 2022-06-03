import React from "react";
import {Link} from "react-router-dom";
import TotalFunction from "../functions/TotalFunction";

class CartListTotals extends React.Component{
    makeMoney(amount){
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount / 100)
    }

    render() {
        const {onClick, onChange, couponValue, couponError, subTotal, total, shipping} = this.props;

        let alert
        if(couponValue !== null && couponValue.length === 0){
            alert = <div className="alert alert-danger">Coupon is not valid</div>;
        }
        if(couponError !== null){
            alert = <div className="alert alert-danger">{couponError}</div>;
        }

        return (
            <div>
            <section id="cart-bottom" className="container">
                <div className="row">
                    <div className="coupon col-lg-6 col-md-6 col-12 mb-4">
                        <div>
                            <h5>COUPON</h5>
                            <p>Enter your coupon code if you have one</p>
                            {alert}
                            <input className="form-control" onChange={onChange} type="text" placeholder="Coupon Code"/>
                            <button onClick={onClick} className="btn">APPLY COUPON</button>
                        </div>
                    </div>
                    <div className="total col-lg-6 col-ma-6 col-12" >
                        <div>
                            <h5>CART TOTAL</h5>
                            <div className="d-flex justify-content-between">
                                <h6>Subtotal</h6>
                                <p>{this.makeMoney(subTotal)}</p>
                            </div>
                            {couponValue && couponValue.length !== 0 &&
                            <div className="d-flex justify-content-between">
                                <h6>Discount</h6>
                                <p>- {
                                    couponValue[0]['discountType'] === "percent" ?
                                        this.makeMoney(subTotal / 100 * couponValue[0]['value']) :
                                        this.makeMoney(couponValue[0]['value'] * 100)
                                }
                                </p>
                            </div>
                            }
                            <div className="d-flex justify-content-between">
                                <h6>Shipping</h6>
                                <p>{this.makeMoney(shipping)}</p>
                            </div>
                            <hr className="second-hr"/>
                            <div className="d-flex justify-content-between">
                                <h6>Total</h6>
                                <p>{this.makeMoney(total)}</p>
                            </div>
                            <Link to="/checkout" className="btn ml-auto">PROCEED TO CHECKOUT</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        );
    }
}

export default CartListTotals;