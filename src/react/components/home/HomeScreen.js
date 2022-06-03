import React, {useRef} from "react";
import HorizontalScrollContainer from "./HorizontalScrollContainer";

export class HomeScreen extends React.Component{
    render() {

        return (
            <div>
            <section className="hero">
            <HorizontalScrollContainer/>
                <div className="container text">
                    <h2>Craftbier Specialist</h2>
                    <h1>H<img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"} alt="logo"/>p-St<img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo.png"} alt="logo"/>p.nl</h1>
                    <p>Zelf samenstellen of kies uit pakketten</p>
                </div>
            </section>
                {/*<div className="d-flex justify-content-center">*/}
                {/*    <h1 className="new-products-h1">Uitgelichte Producten</h1>*/}
                {/*</div>*/}
                {/*<hr className="hr-home-screen-2"/>*/}
            </div>
        );
    }
}