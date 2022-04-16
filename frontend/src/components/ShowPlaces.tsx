import "./ShowPlaces.scss";
import React from "react";
import L from "leaflet";
import {Marker, Popup, Tooltip} from "react-leaflet";
import Place from "../models/Place";


const placeIcon = new L.Icon({
    iconUrl: require("../resources/images/iconSmile.png"),
    iconSize: [35, 35]
});

interface ShowPlacesProps {
    restPlaces: Place[]
}

export default function ShowPlaces(props: ShowPlacesProps) {

    const {restPlaces} = props

    return (
        <>
            {restPlaces.map((place) => (
                <Marker
                    key={place.id}
                    position={[place.lat, place.lng]}
                    icon={placeIcon}
                >
                    <Popup>standard Popup</Popup>
                    <Tooltip>nice</Tooltip>
                </Marker>))}
        </>
    );

}