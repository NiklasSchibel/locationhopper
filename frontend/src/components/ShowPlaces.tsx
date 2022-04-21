import "./ShowPlaces.scss";
import React from "react";
import L from "leaflet";
import {Marker, Popup, Tooltip} from "react-leaflet";
import Place from "../models/Place";
import {deletePlace} from "../service/RequestService";



interface ShowPlacesProps {
    restPlaces: Place[]
    typeRest: string
}



export default function ShowPlaces(props: ShowPlacesProps) {

    const {restPlaces,typeRest} = props


    const placeIcon = new L.Icon({
        iconUrl: require("../resources/images/"+typeRest.toLowerCase()+".png"),
        iconSize: [35, 35]
    });

    function deletePlaceInMapp(id: string){
        alert('deleted: ' + id);
        deletePlace(id);
    }

    return (
        <>
            {restPlaces.map((place) => (
                <Marker
                    key={place.id}
                    position={[place.lat, place.lng]}
                    icon={placeIcon}
                >
                    <Popup>
                         <span onClick={()=>deletePlaceInMapp(place.id)}>
                        Deleted if clicked!
                        </span>
                    </Popup>
                    <Tooltip>
                       nice
                    </Tooltip>
                </Marker>))}
        </>
    );

}