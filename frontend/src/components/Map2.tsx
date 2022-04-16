
import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";


export default function Map2() {



return(
<>
<MapContainer id="map" center={[48.135, 11.581]} zoom={13}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[48.135, 11.581]}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
</MapContainer>
</>
)
}