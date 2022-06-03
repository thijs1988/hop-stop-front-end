import React from "react";
import {renderField} from "../../../form";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {filteredProductsListDelete, productListFetch} from "../../actions/actions";

const mapStateToProps = state => ({
    ...state.productList
})

const mapDispatchToProps = {
    productListFetch, filteredProductsListDelete
}

class ProductFilter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            highToLow: false,
            lowToHigh: false,
        };
    }

    togglePopup(e){
        document.getElementById('popup-1')
            .classList.toggle("active")
    }

    deleteFilters(e){
        const {filteredProductsListDelete, category} = this.props;
        filteredProductsListDelete(category)
    }

    onSubmit(values){
        const {productListFetch, min, max, order, input, category} = this.props;
        if(this.state.lowToHigh === true && this.state.highToLow === false){
            productListFetch(category, 1, values.min ? values.min * 100 : min , values.max ? values.max * 100 : max , 'asc', values.input ? values.input : input)
        }
        if(this.state.highToLow === true && this.state.lowToHigh === false){
            productListFetch(category, 1, values.min ? values.min * 100 : min , values.max ? values.max * 100 : max, 'desc', values.input ? values.input : input)
        }
        if(this.state.highToLow === false && this.state.lowToHigh === false){
            productListFetch(category, 1, values.min ? values.min * 100 : min , values.max ? values.max * 100 : max, order, values.input ? values.input : input)
        }
    }

    onSearch(values){
        const {productListSearch} = this.props;
        productListSearch(1, values.input)
    }

    onPriceHighToLow(e){
        this.setState(prevState => ({highToLow: !prevState.highToLow}))
        this.setState({lowToHigh: false})
    }

    onPriceLowToHigh(e){
        this.setState(prevState => ({lowToHigh: !prevState.lowToHigh}))
        this.setState({highToLow: false})
    }

    render() {
        const {handleSubmit, min, max, order, input} = this.props;
        let button;
        if(min !== null || max !== null || order !== null || input !== null){
            button = <button onClick={this.deleteFilters.bind(this)} className="btn filter-button">Delete Filters</button>
        }
        return (
            <div id="search-bar-container">
            <div className="container">
            <div className="popup" id="popup-1">
                <div className="content-filter">
                    <div className="close-btn" onClick={this.togglePopup.bind(this)}>X</div>
                        <h1 className='head-filters'>Filters</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="input-field">
                                <Field name="min" min="0" type="number" step=".01" placeholder="Minimum Price" classname="validate" component={renderField}/>
                            </div>
                            <div className="input-field">
                                <Field name="max" type="number" step=".01" placeholder="Maximum Price" classname="validate" component={renderField}/>
                            </div>
                        {this.state.lowToHigh === false &&
                        <div className="form-group">
                            <input id="checkboxes" className="form-check-input checkbox-checkout" type="checkbox"
                                   value={false}
                                   onClick={this.onPriceHighToLow.bind(this)}
                            />
                            <label className="form-check-label price-order">Prijs hoog naar laag</label>
                        </div>
                        }
                        {this.state.highToLow === false &&
                        <div className="form-group">
                            <input id="checkboxes" className="form-check-input checkbox-checkout" type="checkbox"
                                   value={false}
                                   onClick={this.onPriceLowToHigh.bind(this)}
                            />
                            <label className="form-check-label price-order">Prijs laag naar hoog</label>
                        </div>
                        }
                    <button onClick={this.togglePopup.bind(this)} type="submit" className="btn second-button btn-block">
                        Search
                    </button>
                    </form>
                </div>
            </div>
            </div>
            <div className="container">
                <div className="filter-content">
                    <div className="filter-align">
                    <button onClick={this.togglePopup.bind(this)} className="btn filter-button">Filters</button>
                    </div>
                    <div className="filter-align">
                    {button}
                    </div>
                    <div className="filter-align">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="search-bar">
                        <Field type="text" placeholder="search anything" classname="search-input" name="input" component={renderField}/>
                        <button type="submit" className="btn">Search</button>
                    </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'ProductFilter'
})(connect(mapStateToProps, mapDispatchToProps)(ProductFilter));