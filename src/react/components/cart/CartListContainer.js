import React from "react";
import {connect} from "react-redux";
import {Spinner} from "../Spinner";
import CartList from "./CartList";
import {
    cartListFetch,
    cartListUnload,
    cartProductDelete,
    cartProductPatch,
    fetchAllProducts,
} from "../../actions/actions";
import CartListTotals from "./CartListTotals";
import {deleteProductFromSession, updateAmountFromSession} from "../../actions/cartSessionActions";
import HorizontalScrollContainer from "../home/HorizontalScrollContainer";
import {fetchCouponDetails} from "../../actions/paymentActions";
import TotalFunction from "../functions/TotalFunction";

const mapStateToProps = state => ({
    ...state.cartList,
    ...state.cartListSession,
    ...state.payment,
    ...state.productList,
    userData: state.auth.userData
});

const mapDispatchToProps = {
    cartListFetch,
    cartListUnload,
    cartProductDelete,
    cartProductPatch,
    deleteProductFromSession,
    updateAmountFromSession,
    fetchCouponDetails,
    fetchAllProducts
};

class CartListContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            coupon: '',
            cartId: window.localStorage.getItem('cartId') ? window.localStorage.getItem('cartId') : null,
        }
    }

    componentWillMount() {
        this.props.fetchAllProducts();
    }

    componentDidMount() {
        if(this.state.cartId){
            this.props.cartListFetch(this.state.cartId);
        }
    }

    componentWillUnmount() {
        this.props.cartListUnload();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {cartItems} = this.props;
        if (prevProps.cartItems !== cartItems){
            this.props.cartListFetch(this.state.cartId);
        }
    }

    onDeleteClick(value){
        const {cartProductDelete, cartItems, deleteProductFromSession} = this.props;
        if(cartItems !== null){
            cartProductDelete(value)
        }
        const cartSession = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
        if(cartSession !== null){
            deleteProductFromSession(value);
        }
    }

    onClickAmount(value, item) {
        const {cartProductPatch, cartProductDelete, cartItems, updateAmountFromSession} = this.props;
        let regex = /^[0-9]*$/;
        if( !regex.test(value) || value === '' ) {
            return false;
        }
        this.setState({
            error: ''
        })
        if(cartItems !== null) {
            if (value > item.product.inventory){
                return this.setState({error: 'Only '+item.product.inventory+' available'});
            }
            if (value === '0') {
                cartProductDelete(item);
            }
            if (value && value !== '0') {
                cartProductPatch(value, item)
            }
        }
        const cartSession = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
        if(cartSession && cartSession.length !== 0){
            if (value > item.inventory){
                return this.setState({error: 'Only '+item.inventory+' available'});
            }
            cartSession.forEach(cartItem => {
                if (cartItem.productId === item.productId){
                    cartItem.amount = value;
                }
            })
            localStorage.setItem('cart', JSON.stringify(cartSession));
            updateAmountFromSession(cartSession)
        }
    }

    handleChangeCoupon(value){
        this.setState({
            coupon: value
        })
    }

    applyCoupon(coupon){
        const {fetchCouponDetails} = this.props;
        fetchCouponDetails(coupon)
    }

    render() {
        const {isFetching, cartItems, currentPage, cartProductPatch, cart, couponValue, couponError, allProducts} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        if(cartItems){
            cartItems.map(item => {
                if(item.amount > item.product.inventory){
                    cartProductPatch(item.product.inventory, item)
                }
            })
        }

        if(cart && cart.length !== 0){
            let count = 0
            cart.map(item => {
                if(allProducts){
                    let dbItem = allProducts.filter(x => x['@id'] === item.productId)
                    if (item.amount > dbItem[0].inventory){
                        item.amount = dbItem[0].inventory
                        count = 1
                    }
                }
            })
            if (count === 1){
                localStorage.setItem('cart', JSON.stringify(cart));
                updateAmountFromSession(cart)
            }
        }

        let totals = new TotalFunction();

        let subTotal = 0
        let shipping = 0
        let total = 0
        if(cart !== null || cartItems !== null){
            subTotal = totals.total(cart, cartItems);
            shipping = subTotal > 7500 ? 0 : 695;
            total = totals.totalAmount(subTotal, shipping, couponValue);
        }



        return (
            <div className="scroll-size">
            <HorizontalScrollContainer/>
            <CartList cartItems={cartItems} cartSession={cart} error={this.state ? this.state.error : null} onClick={this.onDeleteClick.bind(this)} onClickAmount={this.onClickAmount.bind(this)}/>
            {/*{showLoadMore && <LoadMore*/}
            {/*    label="LOAD MORE ITEMS..."*/}
            {/*    onClick={this.onLoadMoreClick.bind(this)}*/}
            {/*    disabled={isFetching}*/}
            {/*/>}*/}
            <CartListTotals
                cartItems={cartItems}
                cartSession={cart}
                onClick={() => {this.applyCoupon(this.state.coupon)}}
                onChange={(e) => {this.handleChangeCoupon(e.target.value)}}
                couponValue={couponValue}
                couponError={couponError}
                subTotal={subTotal}
                shipping={shipping}
                total={total}
            />
            </div>
            );
    }
}

// export default CartListContainer;
export default connect(mapStateToProps, mapDispatchToProps)(CartListContainer);