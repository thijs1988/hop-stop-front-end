import React from "react";

export class CompanyHeader extends React.Component {
    render() {
        return(
            <h1 className="h1-categories-products">H<img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"} alt="logo" className="header-categories-img"/>p-St<img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"} alt="logo" className="header-categories-img"/>p.nl</h1>
        );
    }
}