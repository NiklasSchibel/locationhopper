import {MapContainer, Marker, TileLayer} from "react-leaflet";
import ShowPlaces from "./ShowPlaces";
import React, {useCallback, useEffect, useState} from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";
import './Map.scss';
import 'leaflet/dist/leaflet.css';
import {createPlace, getAllThePlaces} from "../service/RequestService";
import Place from "../models/Place";
import {Button} from "@mui/material";
import {Language} from "@mui/icons-material";

const markerIcon = new L.Icon({
    iconUrl: require("../resources/images/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

export default function Map() {
    const location = useGeoLocation();
    const [map, setMap] = useState<L.Map>();
    const [center] = useState({lat: 50.941278, lng: 6.958281});
    const ZOOM_LEVEL_DEFAULT = 7;
    const ZOOM_LEVEL_CURRENT = 18;
    const [restPlaces, setRestPlaces] = useState<Place[]>([])


    useEffect(() => {
        getAllThePlaces().then(data => setRestPlaces(data))
    }, [])

    const showLocation = useCallback(() => {
        if (location.coordinates && map) {
            map.flyTo(location.coordinates, ZOOM_LEVEL_CURRENT)
        }
    }, [map, location])

    const createMarkerAtLocation = () => {
        if (location.coordinates && map) {
            createPlace(location.coordinates).then(() => getAllThePlaces().then(data => setRestPlaces(data)));
        }
    }

    return (
        <div className="mapDiv">
            <Button className="locationButton" variant="contained" style={{backgroundColor: "white", color: "orange", borderRadius: "15px"}} endIcon={<Language/>}
                    onClick={showLocation}>
                Get current location
            </Button>
            <div className="mapContainer">
                <MapContainer center={center} zoom={ZOOM_LEVEL_DEFAULT} whenCreated={setMap}>
                    <TileLayer
                        // attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />
                    {location.loaded && !location.error && location.coordinates && (
                        <Marker
                            // icon={markerIcon}
                            position={[
                                location.coordinates.lat,
                                location.coordinates.lng,
                            ]}
                        />
                    )}
                    <ShowPlaces restPlaces={restPlaces}/>
                </MapContainer>
            </div>
            {/*creates new doggy bag marker (ONLY IF LOGGED IN) */}
            <Button className="markerButton" variant="contained" style={{backgroundColor: "white", color: "orange", borderRadius: "15px"}} onClick={createMarkerAtLocation}>
                Mark new Doggy Bag Place
            </Button>
        </div>
    );
}