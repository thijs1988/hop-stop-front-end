import React from "react";
import {BsFacebook} from "react-icons/bs";
import {AiFillInstagram, AiFillHome, AiFillPhone} from "react-icons/ai";
import {FaWhatsappSquare} from "react-icons/fa";
import {MdLocalPostOffice, MdAlternateEmail} from "react-icons/md";
import {Link} from "react-router-dom";

export class Footer extends React.Component {
    render() {
        return(
            <footer>
            <div id="footer" className="container-fluid">
                <div className="row justify-content-around">
                    <div className="col-6">
                        <h3>Hop-Stop.nl</h3>
                        <hr/>
                        <p> Hop kent alfazuren die U vaak als bitterheid kan proeven in de meeste IPA's.
                            De laatste jaren is er echter veel verandert en worden er uit hops de meest
                            complexe smaakprofielen gecreëerd zoals grapefruit, citrus, perzik, meloen,
                            limoen, kruisbes, passievrucht, lychee en nog veel meer. Hop-Stop heeft als
                            missie alleen de beste "Craft Bieren" te selecteren en distribueren.
                        </p>
                            <Link to="/terms" className="terms-link">Algemene Voorwaarden</Link>
                    </div>
                    <div className="col-3">
                        <h3>Contact</h3>
                        <hr/>
                        <ul>
                            <li><AiFillHome/>  Frederikplein 8</li>
                            <li><MdLocalPostOffice/>  5121 MB Rijen</li>
                            <li><MdAlternateEmail/>  hopstop.bier@gmail.com</li>
                            <li><AiFillPhone/>  06-12873056</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <h3>Social</h3>
                        <hr/>
                        <div className="d-flex justify-content-around social">
                        <a href="http://www.facebook.com"><BsFacebook/></a>
                        <a href="http://www.instagram.com"><AiFillInstagram/></a>
                        <a href="http://www.whatsapp.com"><FaWhatsappSquare/></a>
                        </div>
                    </div>
                </div>
            </div>
            </footer>
        );
    }
}