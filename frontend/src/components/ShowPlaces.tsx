import "./ShowPlaces.scss";
import React from "react";
// @ts-ignore
import L from "leaflet";
import {Marker} from "react-leaflet";
import Place from "../models/Place";


const placeIcon = new L.Icon({
    iconUrl: require("../resources/images/iconSmile.png"),
    iconSize: [35, 35]
});

interface ShowPlacesProps{
    restPlaces: Place[]
}

export default function ShowPlaces(props: ShowPlacesProps){

    const {restPlaces} = props

    return (
        <>
            {restPlaces.map((bagPlace) => (
                <Marker
                    key={bagPlace.id}
                    position={[bagPlace.lat, bagPlace.lng]}
                    // icon={placeIcon}
                >
                </Marker>))}
        </>
    );

}