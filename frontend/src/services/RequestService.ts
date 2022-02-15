import axios from "axios";
import {LoginData} from "../models/LoginData";


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
    } : {}).then(response => response.data)
        .catch((error) => {
            console.log(error);
        })

export const sendResult = (token?: string) =>
    axios.post('api/abc/results/', token ? {
        headers: {
            "Authorization": "Bearer " + token
        }
    } : {}).catch((error) => {
        console.log(error)
    })
