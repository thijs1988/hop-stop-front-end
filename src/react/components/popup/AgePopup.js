import React, {useState} from "react";

function AgePopup(props) {
    const [rememberMe, setRememberMe] = useState(false);

    return (props.trigger) ? (
        <div className="age-popup">
                <div className="row justify-content-around age-popup-inner">
                    <div className="logo-popup col-6">
                        <img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Logo-big.png"} alt="logo"/>
                    </div>
                    <div className="text-popup text-center col-6">
                        <h3>LEEFTIJD CONTROLE</h3>
                        <hr className="hr-head"/>
                        <p>Door op ja te klikken, verklaar ik ouder te zijn dan 18.</p>
                            <div className="form-group">
                                <input className="" type="checkbox"
                                       value={rememberMe}
                                       onClick={() => setRememberMe(!rememberMe)}
                                />
                                <label className="form-check-label">Onthoud Mij</label>
                            </div>
                        <button className="btn btn-block" onClick={() => props.onAgeValidation(false, rememberMe)}>JA</button>
                        <h5><hr/>OF<hr/></h5>
                        <button className="btn btn-block nee-button" onClick={() => props.onAgeValidation(true)}>NEE</button>
                    </div>
                </div>
        </div>
    ) : "";
}

export default AgePopup;