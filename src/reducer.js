import {combineReducers} from "redux";
import productList from "./react/reducers/productList";
import product from "./react/reducers/product";
import categoryList from "./react/reducers/categoryList";
import cartList from "./react/reducers/cartList";
import {reducer as formReducer} from "redux-form";
import auth from "./react/reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./react/reducers/registration";
import cartListSession from "./react/reducers/cartListSession";
import payment from "./react/reducers/payment";

export default combineReducers({
    productList,
    product,
    categoryList,
    auth,
    cartList,
    registration,
    cartListSession,
    payment,
    router: routerReducer,
    form: formReducer
})