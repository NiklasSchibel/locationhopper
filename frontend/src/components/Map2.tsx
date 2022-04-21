
import React, { useCallback, useEffect, useMemo, useRef, useState} from "react";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer, Tooltip, useMap,
    // useMapEvents,
} from 'react-leaflet'
import Place from "../models/Place";
import {createPlace, getAllThePlaces, getAllThePlacesByType} from "../service/RequestService";
import ShowPlaces from "./ShowPlaces";
import L from "leaflet";
import {PlaceCreationDTO} from "../models/PlaceCreationDTO";
import {Button} from "@mui/material";
// import {PlaceCreationDTO} from "../models/PlaceCreationDTO";
import Typography from '@mui/material/Typography';
import {SimpleDialog} from "./SimpleDialog";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import DiningIcon from "@mui/icons-material/Dining";
import SportsBarIcon from "@mui/icons-material/SportsBar";



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
    const [placesBeer, setPlacesBeer] = useState<Place[]>([])
    const [placesRestaurant, setPlacesRestaurant] = useState<Place[]>([])
    const [placesCafe, setPlacesCafe] = useState<Place[]>([])
    const [draggable, setDraggable] = useState(false)
    // const [currentposition, setCurrentPosition] = useState(null)
    const markerRef = useRef(null)
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState("all")


    useEffect(() => {
        getAllThePlaces().then(data => setRestPlaces(data))
        getAllThePlacesByType("restaurant").then(data => setPlacesRestaurant(data))
        getAllThePlacesByType("cafe").then(data => setPlacesCafe(data))
        getAllThePlacesByType("beer").then(data => setPlacesBeer(data))
    }, [selectedValue])

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
        iconUrl: require("../resources/images/iconSmile.png"),
        iconSize: [35, 35]
    });


    // console.log(restPlaces,placesBeer,placesRestaurant,placesCafe)



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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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
        const value = position;
        value.placeType = selectedValue.toUpperCase();
        createPlace(value);
        getAllThePlaces().then(data => setRestPlaces(data));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };


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
            <Tooltip>
                nice place? trag the blue marker here... and then add it to the map
            </Tooltip>
        </Marker>
        <LocationMarker/>
        {/*<ShowPlaces restPlaces={restPlaces}*/}
        {/*            />*/}
        {selectedValue==="Cafe" && <ShowPlaces restPlaces={placesCafe} typeRest={"cafe"}/>}
        {selectedValue==="Restaurant" && <ShowPlaces restPlaces={placesRestaurant} typeRest={"restaurant"}/>}
        {selectedValue==="Beer" && <ShowPlaces restPlaces={placesBeer} typeRest={"beer"}/>}
        {selectedValue==="all" && <ShowPlaces restPlaces={placesCafe} typeRest={"cafe"}/> }
        {selectedValue==="all" && <ShowPlaces restPlaces={placesRestaurant} typeRest={"restaurant"}/> }
        {selectedValue==="all" && <ShowPlaces restPlaces={placesBeer} typeRest={"beer"}/> }

    </MapContainer>
    <Typography variant="subtitle2" component="div">
        {selectedValue}
        {selectedValue==="Cafe" && <LocalCafeIcon />}
        {selectedValue==="Restaurant" && <DiningIcon />}
        {selectedValue==="Beer" && <SportsBarIcon />}
        {selectedValue==="all" &&  <LocalCafeIcon />}
        {selectedValue==="all" &&  <DiningIcon />}
        {selectedValue==="all" &&  <SportsBarIcon />}
    </Typography>
    {/*<br />*/}
    <Button variant="outlined" onClick={handleClickOpen}>
        choose location type
    </Button>
    <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
    />
    {selectedValue!=="all" &&
    <Button variant="outlined"
            onClick={() => {
                alert('clicked');
                addBlueMarker();
            }}
    >
        add new Marker
    </Button>}
</>
)
}