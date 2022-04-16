import React from 'react';
import './App.css';
import Blog from "./BlogTheme/Blog";
import Map from "./components/Map";
import {QueryClient, QueryClientProvider} from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const queryClient = new QueryClient();



export default function App() {
    return (
        <>
            {/*<QueryClientProvider client={queryClient}>*/}
            {/*     <Map/>*/}
            {/*</QueryClientProvider>*/}
         <Blog/>


                <MapContainer id="map" center={[51.505, -0.09]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

        </>
    );
}