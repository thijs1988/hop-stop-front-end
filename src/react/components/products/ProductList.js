import React from "react";
import {Message} from "../Message";
import ProductForm from "../ProductForm";
import {TiStarburst} from "react-icons/ti";

class ProductList extends React.Component{
    render() {
        const {products, cartId, cartItems} = this.props;

        if (products === null || 0 === products.length){
            return (
                <div style={{"margin-top": "70px"}}>
                    <Message message="Helaas, er zijn geen producten om te weergeven"/>
                </div>
            )
        }

        return (
            <div id="product-card" className="container">
                <div className="row justify-content-center equal-height-col">
                    {products && products
                        .filter(product => {
                            return (
                                product.inventory !== 0 && product.inventory !== null
                            );
                        })
                        .map(product => (
                        <div id="card-product-col" className="col-lg-2 col-md-3" key={product.id}>
                            <div>
                            <h5 className="text-center card-head">
                                {/*<Link to={`/product/${product.id}`}>{product.name}</Link>*/}
                                {product.name.slice(0, 40)}
                            </h5>
                                {product.featured && product.offer &&
                                    <div className="featured-offer">
                                        <TiStarburst className="badge-list-discount"/>
                                        <p className="badge-list-discount-text">KORTING!</p>
                                        <TiStarburst className="badge-list-new"/>
                                        <p className="badge-list-text">NIEUW!</p>
                                        {product.images &&
                                        <img src={product.images[0]['filePath']}/>
                                        }
                                    </div>
                                }
                                {product.offer && !product.featured &&
                                    <div className="offer">
                                        <TiStarburst className="badge-list-discount"/>
                                        <p className="badge-list-discount-text">KORTING!</p>
                                        {product.images &&
                                        <img src={product.images[0]['filePath']}/>
                                        }
                                    </div>
                                }
                                {!product.offer && product.featured &&
                                    <div className="featured">
                                        <TiStarburst className="badge-list-new"/>
                                        <p className="badge-list-text">NIEUW!</p>
                                        {product.images &&
                                        <img src={product.images[0]['filePath']}/>
                                        }
                                    </div>
                                }
                                {!product.offer && !product.featured &&
                                    product.images && <img src={product.images[0]['filePath']}/>

                                }
                                <h5 className="card-abv">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        {product.abv} %
                                    </div>
                                    <div>
                                        {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(product.price / 100)}
                                    </div>
                                    <div>
                                        IBU: {product.ibu}
                                    </div>
                                </div>
                            </h5>
                                <ProductForm product={product} cartId={cartId} cartItems={cartItems}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductList;