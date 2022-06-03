import React, {useState} from 'react';
import {Message} from "../Message";
import ProductForm from "../ProductForm";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0
        };
    }

    render(){
        const {product, cartId, cartItems} = this.props;

        if (product === null){
            return (<Message message="Product does not exist"/>)
        }

        const nextSlide = () => {
            this.setState({
                currentImage: this.state.currentImage === length - 1 ? 0 : this.state.currentImage + 1
            })
        }

        const prevSlide = () => {
            this.setState({
                currentImage: this.state.currentImage === 0 ? length - 1 : this.state.currentImage - 1
            })
        }

        // if(!Array.isArray(product.images) || product.images.length <= 0){
        //     return null;
        // }

        const length = product.images.length;

        return (
            <div className="container">
                <div id="product-details">
                    <div className="col-6 product-details-image text-center">
                        <div className="slider">
                            <FaArrowAltCircleLeft className={"left-arrow"} onClick={prevSlide}/>
                            <FaArrowAltCircleRight className={"right-arrow"} onClick={nextSlide}/>
                            {product.images.map((image, index) => {
                                return (
                                    <div className={index === this.state.currentImage ? 'slide active' : 'slide'} key={index}>
                                        {
                                            index === this.state.currentImage && (
                                                <img src={image.filePath} alt="product-image" className="product-image"/>
                                            )
                                        }
                                    </div>
                                    )
                            })
                            }
                        </div>
                    </div>
                    <div className="col-6 product-details-text">
                        <h1>
                            {product.logo &&
                                <img src={product.logo.filePath} alt="logo-brand" className="logo-brand"/>
                            }
                            {product.name.slice(0,40)}
                        </h1>
                        <p>
                            {product.description.length > 500 ? product.description.slice(0,500)+'...' : product.description}
                            <br/>
                            {product.description.length > 500 && <button onClick={() => {alert(product.description)}}>Show more...</button>}
                        </p>

                        {product.ingredients &&
                        <p>INGREDIENTS:<br/> {product.ingredients}</p>
                        }
                        <ul>
                            {product.brands &&
                            <li>MERK: {product.brands.name.slice(0,20)}</li>
                            }
                            <li>TYPE: {product.type.slice(0,20)}</li>
                            {product.country &&
                            <li>LAND: {product.country}</li>
                            }
                            {product.ibu &&
                            <li>IBU: {product.ibu}</li>
                            }
                            {product.content &&
                            <li>INHOUD: {product.content}</li>
                            }
                            {product.abv &&
                            <li>ALC: {product.abv}%</li>
                            }
                        </ul>
                        <div className="d-flex justify-content-around">
                            <div>
                                <h2>{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(product.price / 100)}</h2>
                            </div>
                            <div>
                                <h2>Available: {product.inventory ? product.inventory : 0}</h2>
                            </div>
                        </div>
                        <ProductForm product={product} cartId={cartId} cartItems={cartItems}/>
                    </div>
                </div>

            </div>


            // <div className="card mb-3 mt-3 shadow-sm" key={product.id}>
            //     <div className="card-body">
            //         <h2>{product.name}</h2>
            //         <p className="card-text">{product.description}</p>
            //         <p className="card-text border-top">
            //             <small className="text-muted">
            //                 {product.price} by&nbsp;
            //                 {product.brands.name}
            //             </small>
            //         </p>
            //         <ProductForm product={product} cartId={cartId}/>
            //     </div>
            // </div>
        )
    }
}