import React, {useMemo} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import {Spinner} from "../Spinner";
import {CompanyHeader} from "../home/CompanyHeader";


export default function Contact() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if(!isLoaded) return <div><Spinner/></div>;

    return <Map/>
}

function Map() {
    const center = useMemo(() => ({ lat:51.582250, lng:4.921790}), []);
    return (
        <div className="container">
            <div className="d-flex justify-content-center map-container">
                <div className="col-6 col-map">
                    <GoogleMap
                        zoom={10}
                        center={center}
                        mapContainerClassName="map-google"
                    >
                        <Marker position={center}/>
                    </GoogleMap>
                </div>
                <div className="col-6 map-text text-center">
                    <CompanyHeader/>
                    <p>
                        Frederikplein 8 <br/>
                        5121 MB Rijen <br/>
                        hop-stop.bier@gmail.com <br/>
                        +31 6 12873056 <br/>
                    </p>
                </div>
            </div>
        </div>

    )
}