import React from 'react';
import {Link} from "react-router-dom";
import CategoryListContainer from "./categories/CategoryListContainer";

export default class Header extends React.Component {
    // renderProfile(){
    //     const {userData} = this.props;
    // }

    renderUser(renderMenu){
        const {userData, logout} = this.props;

        if(null === userData){
            return (<i className="fas fa-spinnen fa-spin"/>)
        }

        return (
            <div className="row">
                <a href="#" className="btn logout-btn" onClick={logout}>Logout</a>
            </div>
        )
    }

    renderMenu(){
        document.querySelector('nav').classList.toggle('active')
    }

    render() {
        const {isAuthenticated, cart, totalItems, userData, logout} = this.props;
        return (
            <div className="container">
                <nav>
                    <div className="menu-icons" onClick={this.renderMenu}>
                        <i className="icon ion-md-menu"></i>
                        <i className="icon ion-md-close"></i>
                    </div>
                    <Link to="/" className="logo">
                    <img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"}/>
                    </Link>
                    <Link to="/cart" className="hamburger-item hamburger-item-cart"><i className="fas fa-shopping-cart"></i>
                        {' '}Cart
                        <span
                            style={{
                                position: 'absolute',
                                top: '2.5rem'
                            }}
                            className="badge badge-pill badge-danger"
                        >{isAuthenticated ? totalItems : cart.length}</span>
                    </Link>
                        {isAuthenticated ? <Link to="#" className="hamburger-log" onClick={logout}>Logout</Link> : <Link to="/login" className="hamburger-log">Login</Link>}
                    <ul className="nav-list">
                        <li className="first-list-item">
                            <Link to="/" className="" onClick={this.renderMenu}>Home</Link>
                        </li>
                        <CategoryListContainer/>
                        <li>
                        <Link to="/comboDeals" onClick={this.renderMenu}>Combo Deals</Link>
                        </li>
                        <li>
                        <Link to="/about" onClick={this.renderMenu}>About</Link>
                        </li>
                        <li>
                        <Link to="/contact" onClick={this.renderMenu}>Contact</Link>
                        </li>
                        <li style={{position: 'relative'}}>
                            <Link to="/cart" onClick={this.renderMenu}><i className="fas fa-shopping-cart"></i>
                                {' '}Cart
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '2.5rem'
                                    }}
                                    className="badge badge-pill badge-danger"
                                >{isAuthenticated ? totalItems : cart.length}</span>
                            </Link>
                        </li>
                        {
                            !isAuthenticated &&
                            (
                                <li>
                                    <Link to="/register" onClick={this.renderMenu}>Register</Link>
                                </li>
                            )
                        }
                        { userData && isAuthenticated &&
                            <li>
                                <a href="#" className="">Hello {userData.name+' '}
                                    <i className="icon ion-md-arrow-dropdown"></i>
                                </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/update-user" onClick={this.renderMenu}>Change Profile</Link>
                                            <Link to="/update-password" onClick={this.renderMenu}>Change Password</Link>
                                        </li>
                                    </ul>
                            </li>
                        }
                        <li className="move-right">
                            {isAuthenticated ? this.renderUser() : <Link to="/login" className="btn" onClick={this.renderMenu}>Login</Link>}
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}