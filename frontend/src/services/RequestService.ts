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

export const fetch10Characters = () =>
    axios.get("https://zoo-animal-api.herokuapp.com/animals/rand/10")
        .then(res => res.data)


export const fetch1Characters = () =>
    axios.get("https://zoo-animal-api.herokuapp.com/animals/rand/")
        .then(res => res.data)

