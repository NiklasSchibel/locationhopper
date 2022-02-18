import axios from "axios";
import {LoginData} from "../models/LoginData";
import {letterData} from "../models/LetterData";


export const loginRequest = (login: LoginData) =>
    axios.post(`/auth/login`, login)
        .then(response => response.data)
        .catch(function (error) {
                if (error.response.status === 400) {
                    alert("Bitte überprüfe dein Benutzername und dein Passwort")
                    console.log(error);
                } else if (error.request) {
                    alert("Server ist down, bitte später erneut probieren.")
                    console.log(error.request);
                } else {
                    alert("Ein unerwarteter Fehler ist aufgetreten, bitte später erneut probieren.")
                    console.log('Error', error.message);
                }
            }
        )


export const fetchRandomAnimal = (token?: string) =>
    axios.get('/api/animals/rand', token ? {
        headers: {
            "Authorization": "Bearer " + token
        }
    } : {})
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })


export const getResults = (token?: string) =>
    axios.get(`api/abc/results`,token ? {
        headers: {
            "Authorization": token
        }
    } : {})
        .then(response => response.data)
        .catch((error) => {
            console.log(error)
        })


export const sendResultLetter = (resultLetter: letterData, token?: string) =>
    axios.post(`api/abc/results/`, resultLetter,token ? {
        headers: {
            "Authorization": token
        }
    } : {})
        .catch((error) => {
            console.log(error)
        })

