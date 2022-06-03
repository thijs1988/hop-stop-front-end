import React, {useEffect} from "react";

function HorizontalScrollContainer(){

    return (
            <div id="skew-section" className="container-fluid">
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Queen-Machine-OG-Tree-House-Brewing-Company-220506122152.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/REIMAGINE-P.P.-4.05-Northern-Monk-220423123042.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Super-Treat-Tree-House-Brewing-Company-220506122306.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Smasher-Cryo-Pop-B-Blend-Funky-Fluid-220415172520.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/JJJuiceee-Project-All-the-Hops-Tree-House-Brewing-Company-220506122410.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Hazy-Eyes-Floem-220326155234.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Chubbles-II-Discovering-Pilse-Cloudwater-Brew-Co.-220423123459.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Chubbles-Cloudwater-Brew-Co.-220423123348.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Maple-x-Vanilla-Imperial-Milk--Arpus-Brewing-Co.-220415132407-2.png"} alt="better"/></div>
                <div id="block" className="block"><img src={process.env.REACT_APP_HOME_DIRECTORY+"/uploads/Apex-Brewing-Cypher-DIPA.png"} alt="better"/></div>
            </div>
)
}



export default HorizontalScrollContainer;