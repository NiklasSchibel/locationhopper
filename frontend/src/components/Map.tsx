
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";


import {
    MapContainer,
    Marker,
    Popup,
    TileLayer, Tooltip, useMap
} from 'react-leaflet'
import Place from "../models/Place";
import {createPlace, getAllThePlacesByType} from "../service/RequestService";
import ShowPlaces from "./ShowPlaces";
import L from "leaflet";
import {PlaceCreationDTO} from "../models/PlaceCreationDTO";
import {Button} from "@mui/material";
import Typography from '@mui/material/Typography';
import {SimpleDialog} from "./SimpleDialog";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import DiningIcon from "@mui/icons-material/Dining";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";



const center: PlaceCreationDTO = {
    lat: 48.1369,
    lng: 11.569,
}

interface Map2Props {
    position?: any
    setPosition?: any
}

export default function Map(props: Map2Props) {
    const [position, setPosition] = useState<PlaceCreationDTO>(center)
    // const [restPlaces, setRestPlaces] = useState<Place[]>([])
    const [placesBeer, setPlacesBeer] = useState<Place[]>([])
    const [placesRestaurant, setPlacesRestaurant] = useState<Place[]>([])
    const [placesCafe, setPlacesCafe] = useState<Place[]>([])
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const [open, setOpen] = React.useState(false)
    const [openForm, setOpenForm] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState("all")
    const [enteredValue, setEnteredValue] = React.useState("")

    const placeIconMyself = new L.Icon({
        iconUrl: require("../resources/images/iconSmile.png"),
        iconSize: [35, 35]
    });

    useEffect(() => {
        // getAllThePlaces().then(data => setRestPlaces(data))
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
                <Tooltip>
                    nice place? trag the blue marker here... and then add it to the map
                </Tooltip>
            </Marker>
        );
    }

    function addBlueMarker() {
        const value = position;
        value.placeType = selectedValue.toUpperCase();
        value.placeName = enteredValue;
        createPlace(value);
        setSelectedValue("all");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const handleClickOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const sendValue = () => {
        setOpenForm(false)
        addBlueMarker()
    }

    function handleChange(event: any) {
        setEnteredValue(event.target.value);
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
                  : 'Click on this text to make marker draggable'}
            </span>
            </Popup>
            <Tooltip>
                add locations to the map by clicking <br/> on this marker and make it draggable
            </Tooltip>
        </Marker>
        <LocationMarker/>
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
                handleClickOpenForm();
            }}
    >
        add new Marker
    </Button>}
    <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Naming</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Add a name for the new location
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={sendValue}>Add location</Button>
        </DialogActions>
    </Dialog>
</>
)
}