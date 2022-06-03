import React from "react";
import {cartListFetch, featuredProductsFetch} from "../../actions/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {TiStarburst} from "react-icons/ti";

const mapStateToProps = state => ({
    ...state.productList,
});

const mapDispatchToProps = {
    featuredProductsFetch
};

class FeaturedProductsContainer extends React.Component {
    componentDidMount() {
        const {featuredProductsFetch} = this.props;
        featuredProductsFetch()
    }

    render() {
        const {featuredProducts} = this.props;

        return (
            <div id="featured-container">
                <h1 className="featured-head">NIEUWE CRAFTBIEREN</h1>
                <div id="featured-scroll" className="container-fluid">
                        {featuredProducts && featuredProducts
                            .filter(product => {
                                return (
                                    product.inventory !== 0 && product.inventory !== null
                                );
                            })
                            .map(product => (
                            <div id="card-product-col" className="featured-block" key={product.id}>
                                <div>
                                    <h5 className="text-center card-head">
                                        {/*<Link to={`/product/${product.id}`}>{product.name}</Link>*/}
                                        {product.name.slice(0, 40)}
                                    </h5>
                                    <TiStarburst className="badge-new"/>
                                    <p className="badge-text">NIEUW!</p>
                                    {product.images &&
                                    <img src={product.images[0]['filePath']}/>
                                    }
                                    <h5 className="card-abv">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                {product.abv+' %'}
                                            </div>
                                            <div>
                                                {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(product.price / 100)}
                                            </div>
                                            <div>
                                                {'IBU: '+product.ibu}
                                            </div>
                                        </div>
                                    </h5>
                                    <Link to={`/product/${product.id}`} className="btn featured-btn">Show More</Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProductsContainer);