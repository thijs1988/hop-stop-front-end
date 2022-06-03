import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canCheckout} from "../../../apiUtils";
import {renderField} from "../../../form";
import {transactionAdd} from "../../actions/actions";
import {Link} from "react-router-dom";

const mapDispatchToProps = {
    transactionAdd
}

const mapStateToProps = state => ({
    userData: state.auth.userData
})

class CheckoutForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            termsAccepted: false,
            useCheckoutData: false,
            onDifferentAddressClick: false
        };
    }

    onTermsAcceptedClick(e) {
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}))
    }

    onCheckoutDataClick(e){
        this.setState(prevState => ({useCheckoutData: !prevState.useCheckoutData}))
        if(this.state.useCheckoutData === true) {
            this.setState({onDifferentAddressClick: false})
        }
    }

    onDifferentAddressClick(e){
        this.setState(prevState => ({onDifferentAddressClick: !prevState.onDifferentAddressClick}))
        if(this.state.onDifferentAddressClick === true) {
            this.setState({useCheckoutData: false})
        }
    }

    onSubmit(values){
        const {transactionAdd, reset, cartSession, userData, total, couponValue} = this.props;
        let couponId = null;
        if(couponValue !== null && couponValue.length > 0){
            couponId = couponValue[0]['id']
        }

        let stringTotal = total.toString()
        let mollieTotal = stringTotal.slice(0,-2)+"."+stringTotal.slice(-2,stringTotal.length)

        const cartId = window.localStorage.getItem('cartId');
        if(this.state.useCheckoutData === true){
            return transactionAdd(userData.name, userData.email, userData.postbox, userData.street, userData.phoneNumber, userData.place, cartId, mollieTotal, cartSession, couponId)
                .then(response => {
                    reset();
                    const newUuid = response['@id'].slice(18, response['@id'].length)
                    window.location.href = process.env.REACT_APP_HOME_DIRECTORY+"/pay/"+newUuid
                    }
                )
        }

        return transactionAdd(values.name, values.email, values.postbox, values.street, values.phoneNumber,  values.place, cartId, mollieTotal, cartSession, couponId)
            .then(response => {
                reset();
                const newUuid = response['@id'].slice(18, response['@id'].length)
                window.location.href = process.env.REACT_APP_HOME_DIRECTORY+"/pay/"+newUuid
            });
    }

    render() {
        const {submitting, handleSubmit, userData, cartSession, cartItems} = this.props;


        if ((cartSession === null || cartSession.length === 0) && (cartItems === null || cartItems.length === 0)){
            return(
                <div>
                    <section id="cart-bottom" className="container">
                            <div className="total justify-content-md-center">
                                <div className="checkout-content text-center">
                                    <h5 className="no-cart-items">
                                        There are no items in your cart yet
                                    </h5>
                                </div>
                            </div>
                    </section>
                </div>
            );
        }

        if(!canCheckout(this.props.userData)){
            return (
                <div>
                    <section id="cart-bottom" className="container">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="total justify-content-md-center">
                                <div className="checkout-content text-center">
                                    <h5>
                                        Please fill in your shipping address
                                    </h5>
                                    <div className="text-center">
                                        <div className="checkout-input">
                                            <Field name="name" label="Name:" type="text" component={renderField}/>
                                            <Field name="email" label="Email:" type="text" component={renderField}/>
                                            <Field name="phoneNumber" label="Phone Number:" type="text"
                                                   component={renderField}/>
                                            <Field name="postbox" label="Postal Code:" type="text"
                                                   component={renderField}/>
                                            <Field name="place" label="Place:" type="text" component={renderField}/>
                                            <Field name="street" label="Street and number:" type="text"
                                                   component={renderField}/>
                                        </div>

                                        <div className="form-check form-group">
                                            <input className="form-check-input checkbox-checkout" type="checkbox"
                                                   value={false}
                                                   onClick={this.onTermsAcceptedClick.bind(this)}
                                            />
                                            <label className="form-check-label">I agree to the <Link to="/terms" className="terms-link">terms and conditions</Link></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-big btn-block mollie-button"
                                            disabled={submitting}>Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            );
        }else{
                return(
                    <div>
                        <section id="cart-bottom" className="container">
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="total justify-content-md-center">
                                    <div className="checkout-content">
                                        <h5>
                                            <div className="text-center">
                                                <input className="form-check-input checkbox-checkout" type="checkbox"
                                                       value={true}
                                                       onClick={this.onCheckoutDataClick.bind(this)}
                                                />
                                                <label className="form-check-label">Ship to the address below</label>
                                            </div>
                                        </h5>
                                        {!this.state.useCheckoutData && !this.state.onDifferentAddressClick &&
                                            <div className="text-center default-information">
                                                <div>Name: {userData.name}</div>
                                                <div>Street: {userData.street}</div>
                                                <div>Email: {userData.email}</div>
                                                <div>Phone Number: {userData.phoneNumber}</div>
                                                <div>Postal Code: {userData.postbox}</div>
                                            </div>
                                        }
                                        {!this.state.useCheckoutData &&
                                            <h5>
                                                <div className="text-center">
                                                    <input className="form-check-input checkbox-checkout" type="checkbox"
                                                           value={true}
                                                           onClick={this.onDifferentAddressClick.bind(this)}
                                                    />
                                                    <label className="form-check-label">Ship to a different address</label>
                                                </div>
                                            </h5>
                                        }
                                        <div className="text-center">
                                            {!this.state.useCheckoutData && this.state.onDifferentAddressClick &&
                                                    <div className="checkout-input">
                                                        <Field name="name" label="Name:" type="text" component={renderField}/>
                                                        <Field name="email" label="Email:" type="text" component={renderField}/>
                                                        <Field name="phoneNumber" label="Phone Number:" type="text"
                                                               component={renderField}/>
                                                        <Field name="postbox" label="Postal Code:" type="text"
                                                               component={renderField}/>
                                                        <Field name="place" label="Place:" type="text" component={renderField}/>
                                                        <Field name="street" label="Street and number:" type="text"
                                                               component={renderField}/>
                                                    </div>
                                            }
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-big btn-block mollie-button"
                                                disabled={submitting}>Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                )
        }
    }
}

export default reduxForm ({
    form: 'CheckoutForm'
})(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm))

