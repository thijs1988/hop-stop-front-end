import React from "react";
import ProductList from "./ProductList";
import {cartListFetch, productListFetch, productListSetPage} from "../../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Spinner";
import {Paginator} from "../Paginator";
import ProductFilter from "./ProductFilter";
import {CompanyHeader} from "../home/CompanyHeader";

const mapStateToProps = state => ({
    ...state.cartList,
   ...state.productList,
    userData: state.auth.userData,
});

const mapDispatchToProps = {
    productListFetch, productListSetPage, cartListFetch
};

class ProductListContainer extends React.Component{
    componentDidMount() {
        const {min, max, order, input} = this.props;
        this.props.productListFetch(null, this.getQueryParamPage(), min, max, order, input);
        const cartId = localStorage.getItem('cartId')
        const {cartListFetch} = this.props;

        if (cartId){
            cartListFetch(cartId);
        }
    }
    componentDidUpdate(prevProps) {
        const {currentPage, productListFetch, productListSetPage, min, max, order, input} = this.props;

        if(prevProps.match.params.page !== this.getQueryParamPage()){
            productListSetPage(this.getQueryParamPage());
        }

        if (prevProps.currentPage !== currentPage){
            productListFetch(null, currentPage, min, max, order, input)
        }
    }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page){
        const {history, productListSetPage} = this.props;
        productListSetPage(page);
        history.push(`/cheers/${page}`);
    }

    onNextPageClick(e){
        const {currentPage, pageCount} = this.props;
        const newPage = Math.min(currentPage + 1, pageCount);
        this.changePage(newPage);
    }

    onPrevPageClick(e){
        const {currentPage} = this.props;
        const newPage = Math.max(currentPage - 1, 1);
        this.changePage(newPage);
    }


    render() {
        const {products, isFetching, userData, currentPage, pageCount, cartItems} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        let form;

        if (userData){
            form = <ProductList products={products} cartId={userData.cartItems} cartItems={cartItems}/>
        } else {
            form = <ProductList products={products} />
        }

        return (
            <div>
                <CompanyHeader/>
                <h1 className="featured-head-discount">ALLE CRAFTBIEREN</h1>
                <ProductFilter category={null}/>
                <br/>
                <br/>
                {form}
                {pageCount > 1 &&
                <Paginator
                    currentPage={currentPage}
                    pageCount={pageCount}
                    setPage={this.changePage.bind(this)}
                    nextPage={this.onNextPageClick.bind(this)}
                    prevPage={this.onPrevPageClick.bind(this)}
                />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);