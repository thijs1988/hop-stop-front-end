import React from "react";
import {CompanyHeader} from "../home/CompanyHeader";

export default class About extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center about-container">
                    <div className="col-6 text-center img-col-about">
                        <img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo-big.png"} alt="logo"/>
                    </div>
                    <div className="col-6 text-center text-col-about">
                        <CompanyHeader/>
                        <h2>"de beste hoppen die wij bij u naar binnen koppen"</h2>
                        <p>
                            Het team van HopStop kenmerkt zich door de ervaring en passie op het gebied van brouwen,
                            verkopen, serveren en natuurlijk het drinken speciaal bier. Vandaar dat wij onze kwaliteiten
                            hebben samengebonden om de ideale STOP voor uw dagelijkse HOP te creëren.
                            <br/><br/>
                            Ons assortiment bestaat uit de beste bieren van over de hele wereld. Het is een kritisch
                            selectieproces met een wekelijkse aanvulling op de website om te zorgen voor blikken die
                            u het liefst leeg wilt likken.
                            <br/><br/>
                            Cheers!
                            <br/><br/>
                            Hop-Stop.nl
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}