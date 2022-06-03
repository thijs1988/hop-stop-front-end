import React from "react";
import {Message} from "../Message";

class CartList extends React.Component{
    makeMoney(amount){
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount / 100)
    }

    render() {
        const {cartItems, onClick, onClickAmount, error, cartSession} = this.props;
        // if ((cartItems === null || 0 === cartItems.length) && (cartSession === null || 0 === cartSession.length)){
        //     return (<Message message="There are no products to display"/>)
        // }

        return (
            <div>
                <section id="cart-container" className="container my-5">
                    <table width="100%">
                        <thead>
                        <tr>
                            <td>Remove</td>
                            <td>Image</td>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (cartItems === null || 0 === cartItems.length)
                            &&
                            (cartSession === null || 0 === cartSession.length)
                            &&
                            <tr>
                                <td colSpan="6"><h4 className="no-products">There are no products to display</h4></td>
                            </tr>
                        }
                        {
                            error &&
                            <tr>
                                <td colSpan="6"><h4 className="alert alert-danger">{error}</h4></td>
                            </tr>
                        }
                        {cartItems && cartItems.map(item => (
                        <tr key={item['@id']}>
                            <td><a onClick={() => onClick(item)} href="#"><i className="fas fa-trash-alt"></i></a> </td>
                            <td><img src={item.product.images[0]['filePath']} alt="image"/></td>
                            <td><h5>{item.product.name.slice(0,30)+'...'}</h5></td>
                            <td><h5>{this.makeMoney(item.product.price)}</h5></td>
                            <td>
                                <input min="1" max={item.product.inventory} id={item['@id']} onChange={() => onClickAmount(document.getElementById(item['@id']).value, item)} className="w-25 pl-1" defaultValue={item.amount} type="number"/>
                            </td>
                            <td><h5>{this.makeMoney(item.product.price * item.amount)}</h5></td>
                        </tr>
                            ))}
                        {cartSession && cartSession.map(item => (
                            <tr key={item.productId}>
                                <td><a onClick={() => onClick(item)} href="#"><i className="fas fa-trash-alt"></i></a> </td>
                                <td><img src={item.image} alt="image"/></td>
                                <td><h5>{item.productName.slice(0,30)+'...'}</h5></td>
                                <td><h5>{this.makeMoney(item.price)}</h5></td>
                                <td>
                                    <input min='1' max={item.inventory} step="1" id={item.productId} onChange={() => onClickAmount(document.getElementById(item.productId).value, item)} className="w-25 pl-1" defaultValue={item.amount} type="number"/>
                                </td>
                                <td><h5>{this.makeMoney(item.amount * item.price)}</h5></td>
                            </tr>
                        ))}
                        {
                            error &&
                            <tr>
                                <td colSpan="6"><h4 className="alert alert-danger">{error}</h4></td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

export default CartList;