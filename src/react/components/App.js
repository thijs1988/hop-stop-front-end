import React, {useEffect} from "react";
import {Route, Switch} from "react-router";
import LoginForm from "./user/LoginForm";
import ProductListContainer from "./products/ProductListContainer";
import Header from "./Header";
import ProductContainer from "./products/ProductContainer";
import CategoryProductsListContainer from "./categories/CategoryProductsListContainer";
import {requests} from "../../agent";
import {connect} from "react-redux";
import {cartListFetch, userLogout, userProfileFetch, userSetId} from "../actions/actions";
import CartListContainer from "./cart/CartListContainer";
import RegistrationContainer from "./user/RegistrationContainer";
import CheckoutContainer from "./checkout/CheckoutContainer";
import PaymentStatusContainer from "./paymentStatus/PaymentStatusContainer";
import UpdateUserContainer from "./user/UpdateUserContainer";
import UpdatePasswordContainer from "./user/UpdatePasswordContainer";
import {Footer} from "./footer/Footer";
import AgePopup from "./popup/AgePopup";
import HomeContainer from "./home/HomeContainer";
import ComboDealsContainer from "./comboDeals/ComboDealsContainer";
import Terms from "./terms/Terms";
import Contact from "./contact/Contact";
import About from "./about/About";

const mapStateToProps = state => ({
    ...state.auth,
    ...state.cartListSession,
    ...state.cartList
});

const mapDispatchToProps = {
  userProfileFetch, userSetId, userLogout, cartListFetch
};

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            agePopup: true,
            rememberMe: window.localStorage.getItem('rememberMe') ? window.localStorage.getItem('rememberMe') : false
        }

        const token = window.localStorage.getItem('jwtToken');

        if (token) {
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId')
        const cartId = localStorage.getItem('cartId')
        const { userSetId, cartListFetch} = this.props;

        if (cartId){
            cartListFetch(cartId);
        }

        if (userId){
            userSetId(userId);
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userProfileFetch, userData, cartItems} = this.props;
        if (prevProps.userId !== userId && userId !== null && userData === null){
            userProfileFetch(userId);
        }
    }

    setAgePopup(e, remember){
        if(e === false && remember === true){
            window.localStorage.setItem('rememberMe', remember)
        }
        this.setState({agePopup: e})
    }
    
    render() {
        const {isAuthenticated, userData, userLogout, cart, totalItems, cartItems} = this.props;
        return (
            <div>
                <div className="website-container">
                <Header isAuthenticated={isAuthenticated} userData={userData} cart={cart} totalItems={totalItems} logout={userLogout}/>
                <Switch>
                    <Route path="/terms" component={Terms}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/category/:id/:page?" component={CategoryProductsListContainer}/>
                    <Route path="/comboDeals"><ComboDealsContainer cartItems={cartItems}/></Route>
                    <Route path="/cheers/:page?" component={ProductListContainer}/>
                    <Route path="/paymentStatus/:id" component={PaymentStatusContainer}/>
                    <Route path="/checkout" component={CheckoutContainer}/>
                    <Route path="/update-user" component={UpdateUserContainer}/>
                    <Route path="/update-password" component={UpdatePasswordContainer}/>
                    <Route path="/register" component={RegistrationContainer}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/cart" component={CartListContainer}/>
                    <Route path="/product/:id" component={ProductContainer}/>
                    <Route path="/"><HomeContainer cartItems={cartItems}/></Route>
                </Switch>
                {!isAuthenticated && !this.state.rememberMe &&
                <AgePopup
                    trigger={this.state.agePopup}
                    onAgeValidation={this.setAgePopup.bind(this)}
                />
                }
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);