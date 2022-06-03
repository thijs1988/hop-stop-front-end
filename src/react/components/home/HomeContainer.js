import React from "react";
import {cartListFetch} from "../../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Spinner";
import {HomeScreen} from "./HomeScreen";
import FeaturedProductsContainer from "../featuredProducts/FeaturedProductsContainer";
import DiscountProductsContainer from "../discountProducts/DiscountProductsContainer";
import ComboDealsListContainer from "../comboDeals/ComboDealsListContainer";
import {LoadMore} from "../LoadMore";

const mapStateToProps = state => ({
    ...state.cartList,
});

const mapDispatchToProps = {
    cartListFetch
};

class HomeContainer extends React.Component{
    componentDidMount() {
        const cartId = localStorage.getItem('cartId')
        const {cartListFetch} = this.props;

        if (cartId){
            cartListFetch(cartId);
        }
    }


    render() {
        const {isFetching, cartItems} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        return (
            <div>
                <HomeScreen/>
                <FeaturedProductsContainer/>
                <DiscountProductsContainer/>
                <br/>
                <br/>
                <ComboDealsListContainer cartItems={cartItems}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);