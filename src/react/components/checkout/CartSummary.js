import React from "react";

class CartSummary extends React.Component {
    makeMoney(amount){
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount / 100)
    }

    render() {
        const {cartSession, cartItems, total, subtotal, shipping, couponValue} = this.props;

        if ((cartSession === null || cartSession.length === 0) && (cartItems === null || cartItems.length === 0)){
            return(
                <section id="cart-bottom" className="container">
                    <div className="total">
                        <div>
                            <h5 className="text-center">CART SUMMARY</h5>
                            <h3 className="text-center no-cart-items">
                                The summary cannot be made because there are no products to show yet
                            </h3>
                            <div className="d-flex justify-content-between summary-total">
                                <h3>Total</h3>
                                <h3>€ 0.00</h3>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        return (
            <section id="cart-bottom" className="container">
                <div className="total">
                    <div>
                        <h5 className="text-center">CART SUMMARY</h5>
                        <table className="table table-borderless summary-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th className="text-center">Amount</th>
                                <th className="right-column">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                                {cartItems && cartItems.map(item => {
                                    return(
                                    <tr>
                                        <td>{item.product.name.slice(0, 30) + '...'}</td>
                                        <td className="text-center">{item.amount}</td>
                                        <td className="right-column">{this.makeMoney(item.product.price * item.amount)}</td>
                                    </tr>
                                    )
                                })}
                                {cartSession && cartSession.map(item => {
                                     return(
                                         <tr>
                                             <td>{item.productName.slice(0, 30) + '...'}</td>
                                             <td className="text-center">{item.amount}</td>
                                             <td className="right-column">{this.makeMoney(item.price * item.amount)}</td>
                                         </tr>
                                     )
                                 })}
                            </tbody>
                        </table>
                        <hr className="second-hr"/>
                        <div className="d-flex justify-content-between">
                            <h4>Subtotal</h4>
                            <h4>{this.makeMoney(subtotal)}</h4>
                        </div>
                        <hr className="second-hr"/>
                        {couponValue && couponValue.length !== 0 &&
                            <div className="d-flex justify-content-between">
                                <h4>Discount</h4>
                                <h4>- {
                                    couponValue[0]['discountType'] === "percent" ?
                                        this.makeMoney(subtotal / 100 * couponValue[0]['value']) :
                                        this.makeMoney(couponValue[0]['value'] * 100)
                                }
                                </h4>
                            </div>
                        }
                        <div className="d-flex justify-content-between">
                            <h4>Shipping</h4>
                            <h4>{this.makeMoney(shipping)}</h4>
                        </div>
                        <hr className="second-hr"/>
                        <div className="d-flex justify-content-between summary-total">
                                <h3>Total</h3>
                                <h3>{this.makeMoney(total)}</h3>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default CartSummary;