import React from "react";
import {Spinner} from "../Spinner";
import {connect} from "react-redux";
import ProductList from "../products/ProductList";
import {
    cartListFetch,
    deleteFilters,
    productListFetch,
    productListSetCategoryPage,
} from "../../actions/actions"
import {Paginator} from "../Paginator";
import ProductFilter from "../products/ProductFilter";
import HorizontalScrollContainer from "../home/HorizontalScrollContainer";

const mapStateToProps = state => ({
    ...state.cartList,
    ...state.productList
});

const mapDispatchToProps = {
    cartListFetch,
    productListFetch,
    productListSetCategoryPage,
    deleteFilters
};

class CategoryProductsListContainer extends React.Component {
    componentDidMount() {
        const {cartListFetch, min, max, order, input, productListFetch} = this.props;
        productListFetch(this.props.match.params.id, this.props.match.params.page, min, max, order, input)
        const cartId = localStorage.getItem('cartId')

        if (cartId){
            cartListFetch(cartId);
        }
    }

    // componentWillUnmount() {
    //     this.props.categoryProductsListUnload();
    // }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {categoryPage, productListFetch, productListSetCategoryPage, deleteFilters, min, max, order, input} = this.props;

        if(prevProps.match.params.id !== this.props.match.params.id ){
            productListFetch(this.props.match.params.id, this.getQueryParamPage(), null, null, null, null)
        }

        if(prevProps.match.params.page && prevProps.match.params.page !== this.getQueryParamPage()){
            productListSetCategoryPage(this.getQueryParamPage());
        }

        if (prevProps.categoryPage !== categoryPage){
            productListFetch(this.props.match.params.id, categoryPage, min, max, order, input)
        }
    }

    changePage(page){
        const {history, productListSetCategoryPage} = this.props;
        productListSetCategoryPage(page);
        history.push(`/category/${this.props.match.params.id}/${page}`)
    }

    onNextPageClick(e){
        const {categoryPage, pageCount} = this.props;
        const newPage = Math.min(categoryPage + 1, pageCount);
        this.changePage(newPage);
    }

    onPrevPageClick(e){
        const {categoryPage} = this.props;
        const newPage = Math.max(categoryPage - 1, 1);
        this.changePage(newPage);
    }

    render() {
        const {isFetching, products, cartItems, categoryPage, pageCount} = this.props;
        const cartId = localStorage.getItem('cartId') ? "/api/carts/"+localStorage.getItem('cartId') : null;

        if (isFetching) {
            return (<Spinner/>);
        }

        let categories
        let category
        if(products){
            categories = products[0]['categories']
            if(categories.some(item => item['@id'] === '/api/categories/'+this.props.match.params.id)){
                category = categories.find(x => x['@id'] === '/api/categories/'+this.props.match.params.id).name;
            }
        }

        return (
            <div id="category-products-list">
                <h1 className="h1-categories-products">H<img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"} alt="logo" className="header-categories-img"/>p-St<img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"} alt="logo" className="header-categories-img"/>p.nl</h1>
                <h1 className="featured-head-discount">{category ? category : ''}</h1>
                <ProductFilter category={this.props.match.params.id}/>
                <br/>
                <ProductList products={products} cartId={cartId} cartItems={cartItems}/>
                {pageCount > 1 &&
                <Paginator
                        currentPage={categoryPage}
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductsListContainer);