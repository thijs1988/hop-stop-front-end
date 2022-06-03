import React, {useState} from "react";
import {Field, reduxForm, SubmissionError} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../form";
import {productAddToCart} from "../actions/actions";
import {addProductToSession} from "../actions/cartSessionActions";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => ({
        ...state.cartListSession
    })

const mapDispatchToProps = {
    productAddToCart,
    addProductToSession,
};

class ProductForm extends React.Component {
    onSubmit(values,amountId){
        const {productAddToCart, addProductToSession, cartId, product, reset, cartItems} = this.props;
        reset();
        if(Object.values(amountId).length === 0){
            throw new SubmissionError({_error: 'Vul het aantal in'})
        }
        if (Object.values(amountId).length > 1){
            throw new SubmissionError({_error: 'Gelieve 1 product tegelijk invullen'})
        }
        if(!cartId){
            const item = {
                amount: Object.values(amountId),
                productId: product['@id'],
                productName: product.name,
                price: product.price,
                image: product.images[0]['filePath'],
                inventory: product.inventory
            }
            return addProductToSession(item);
        }else{
            return productAddToCart(parseInt(Object.values(amountId)), cartId, product, cartItems).then(() => reset());
        }
    }
    render() {
        const {handleSubmit, submitting, product, error} = this.props;
        const amountId = "amount"+product.id;
        return (
            <div id="card-product-form" className="card mb-3 mt-3 shadow-sm">
            <div  className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this, amountId))}>
                    <div className="text-center">
                    <Field min="1" max={product.inventory} name={"amount"+product.id} label="Select Amount" type="number" component={renderField}/>
                    </div>
                        <div className="button-row-card">
                        <button type="submit" className="btn btn-primary btn-add-to-cart" disabled={submitting}>
                            Add To Cart
                        </button>
                        <Link to={`/product/${product.id}`} className="btn btn-show-more">Show More</Link>
                        </div>
                </form>
            </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'ProductForm'
})(connect(mapStateToProps, mapDispatchToProps)(ProductForm))