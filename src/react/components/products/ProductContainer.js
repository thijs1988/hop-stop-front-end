import React from "react";
import {cartListFetch, productFetch, productUnload} from "../../actions/actions";
import {connect} from "react-redux";
import Product from "./Product";
import {Spinner} from "../Spinner";

const mapStateToProps = state => ({
   ...state.product,
    ...state.cartList
});

const mapDispatchToProps = {
    productFetch,
    productUnload,
    cartListFetch
}

class ProductContainer extends React.Component {
    componentDidMount(){
        const cartId = localStorage.getItem('cartId')
        this.props.productFetch(this.props.match.params.id);
        if(cartId){
            this.props.cartListFetch(cartId)
        }
    }

    componentWillUnmount() {
        this.props.productUnload();
    }

    render() {
        const {isFetching, product, cartItems} = this.props;
        const cartId = localStorage.getItem('cartId') ? "/api/carts/"+localStorage.getItem('cartId') : null;

        if (isFetching) {
            return(<Spinner/>);
        }

        return (
            <Product product={product} cartId={cartId} cartItems={cartItems}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);