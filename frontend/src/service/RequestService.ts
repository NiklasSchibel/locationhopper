import axios from "axios";
import {PlaceCreationDTO} from "../models/PlaceCreationDTO";



export const getPlaces =  () => {
    return axios.get("/api/places").then(response => response.data)
}


export const createPlace = (newMarker: PlaceCreationDTO, token?: string) => {
    return axios.post("/api/places", newMarker, token ? {
        headers: {
            "Authorization": token
        }
    } : {})
        .then(response => response.data)
        .catch(function (error) {
            if (error.response.status === 500) {
                alert("Are you logged in?")
                console.log(error)
            }
        })
}


export const deletePlace = (id: string, token?: string) => {
    return axios.delete(`/api/places/${id}`, token ? {
        headers: {
            "Authorization": token
        }
    } : {})
        .then(response => response.data)}

