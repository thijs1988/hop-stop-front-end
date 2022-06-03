import React from "react";
import { comboDealsFetch} from "../../actions/actions";
import {connect} from "react-redux";
import ProductList from "../products/ProductList";
import {LoadMore} from "../LoadMore";

const mapStateToProps = state => ({
    ...state.productList,
    userData: state.auth.userData,
});

const mapDispatchToProps = {
    comboDealsFetch,
};

class ComboDealsListContainer extends React.Component {
    componentDidMount() {
        const {comboDealsFetch} = this.props;
        comboDealsFetch()
    }

    onLoadMoreClick(){
        const {currentPage, comboDealsFetch} = this.props;
        comboDealsFetch(currentPage + 1);
    }

    render() {
        const {comboProducts, cartItems, userData, pageCount, currentPage, isFetching} = this.props;
        const showLoadMore = pageCount > 1 && currentPage < pageCount;

        let form;

        if (userData){
            form = <ProductList products={comboProducts} cartId={userData.cartItems} cartItems={cartItems}/>
        } else {
            form = <ProductList products={comboProducts} />
        }

        console.log(comboProducts)

        return (
            <div id="combo-deals-container">
                <h1 className="featured-head-discount">COMBO DEALS</h1>
                {form}
                {showLoadMore && <LoadMore
                    label="LOAD MORE ITEMS..."
                    onClick={this.onLoadMoreClick.bind(this)}
                    disabled={isFetching}
                />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboDealsListContainer);