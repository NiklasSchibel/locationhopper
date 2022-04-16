
import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from "react";


import {
    MapContainer,
    Marker,
    Popup,
    TileLayer, useMapEvents,
    // useMapEvents,
} from 'react-leaflet'
import Place from "../models/Place";
import {getPlaces} from "../service/RequestService";
import ShowPlaces from "./ShowPlaces";
import {PlaceCreationDTO} from "../models/PlaceCreationDTO";


const center = {
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
    const [position, setPosition] = useState(center)
    const [restPlaces, setRestPlaces] = useState<Place[]>([])

    useEffect(() => {
        getPlaces().then(data => setRestPlaces(data))

    }, [])



    const [draggable, setDraggable] = useState(false)

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



    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                // @ts-ignore
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
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
        )
    }

return(
<>
<MapContainer id="map" center={[48.135, 11.581]} zoom={13}>
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
</>
)
}