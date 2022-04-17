
import React, { useCallback, useEffect, useMemo, useRef, useState} from "react";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer, useMap,
    // useMapEvents,
} from 'react-leaflet'
import Place from "../models/Place";
import {createPlace, getPlaces} from "../service/RequestService";
import ShowPlaces from "./ShowPlaces";
import L from "leaflet";
import {PlaceCreationDTO} from "../models/PlaceCreationDTO";
import {Button} from "@mui/material";
// import {PlaceCreationDTO} from "../models/PlaceCreationDTO";


const center: PlaceCreationDTO = {
    lat: 48.1369,
    lng: 11.569,
}

interface Map2Props {
    position?: any
    setPosition?: any
}

export default function Map2(props: Map2Props) {
    // const [position, setPosition] = useState()
    // const {position,setPosition} = props
    const [position, setPosition] = useState<PlaceCreationDTO>(center)
    const [restPlaces, setRestPlaces] = useState<Place[]>([])
    const [draggable, setDraggable] = useState(false)
    // const [currentposition, setCurrentPosition] = useState(null)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    //@ts-ignore
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    const placeIconMyself = new L.Icon({
        iconUrl: require("../resources/images/mann3d.jpg"),
        iconSize: [35, 35]
    });

    useEffect(() => {
        getPlaces().then(data => setRestPlaces(data))
    }, [])




    function LocationMarker() {
        const [currentposition, setCurrentPosition] = useState(null);
        const [bbox, setBbox] = useState([]);

        const map = useMap();

        useEffect(() => {
            map.locate().on("locationfound", function (e) {
                // @ts-ignore
                setCurrentPosition(e.latlng);
                // map.flyTo(e.latlng, map.getZoom());
                const radius = e.accuracy;
                const circle = L.circle(e.latlng, radius);
                circle.addTo(map);
                // @ts-ignore
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, );

        return currentposition === null ? null : (
            <Marker position={currentposition}
                    icon = {placeIconMyself}
                    >
                <Popup>
                    You are here. <br />
                    <b>Southwest lng</b>: {bbox[0]} <br />
                    <b>Southwest lat</b>: {bbox[1]} <br />
                </Popup>
            </Marker>
        );
    }

    function addBlueMarker() {
        createPlace(position);
        getPlaces().then(data => setRestPlaces(data));
    }

return(
<>
    <MapContainer id="map" center={[48.135, 11.581]} zoom={10}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
            position={ position }
            draggable={draggable}
            eventHandlers={eventHandlers}
            ref={markerRef}>
            <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                  ? 'Marker is draggable'
                  : 'Click here to make marker draggable'}
            </span>
            </Popup>
        </Marker>
        <LocationMarker/>
        <ShowPlaces restPlaces={restPlaces}/>
    </MapContainer>
    <Button variant="outlined"
            onClick={() => {
                alert('clicked');
                addBlueMarker();
            }}
    >
        add blue Marker
    </Button>
</>
)
}