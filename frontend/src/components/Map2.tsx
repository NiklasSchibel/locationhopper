
import React, {useEffect, useState} from "react";


import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    // useMapEvents,
} from 'react-leaflet'
import Place from "../models/Place";
import {getPlaces} from "../service/RequestService";
import ShowPlaces from "./ShowPlaces";




export default function Map2() {


    const [restPlaces, setRestPlaces] = useState<Place[]>([])

    useEffect(() => {
        getPlaces().then(data => setRestPlaces(data))

    }, [])
    console.log(restPlaces)
    // function LocationMarker() {
    //     const [position, setPosition] = useState(null)
    //
    //     const map = useMapEvents({
    //         click() {
    //             map.locate()
    //         },
    //         locationfound(e) {
    //             setPosition(e.latlng)
    //             map.flyTo(e.latlng, map.getZoom())
    //         },
    //
    //
    //     return position === null ? null : (
    //     <Marker position={position}>
    //         <Popup>You are here</Popup>
    //     </Marker>
    // )
    // }

return(
<>
<MapContainer id="map" center={[48.135, 11.581]} zoom={13}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[48.1369, 11.569]}>
        <Popup>
            Munich. <br /> click once to locate.
        </Popup>
    </Marker>
    {/*<LocationMarker />*/}
    <ShowPlaces restPlaces={restPlaces}/>
</MapContainer>
</>
)
}