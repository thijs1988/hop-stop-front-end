import React from "react";
import {CompanyHeader} from "../home/CompanyHeader";
import ComboDealsListContainer from "./ComboDealsListContainer";

class ComboDealsContainer extends React.Component {
    render() {
        const {cartItems} = this.props;

        return (
            <div>
                <CompanyHeader/>
                <ComboDealsListContainer cartItems={cartItems}/>
            </div>
        );
    }
}

export default ComboDealsContainer;