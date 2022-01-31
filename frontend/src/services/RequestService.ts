import axios from "axios";
import {LoginData} from "../models/LoginData";


export const loginRequest = (login: LoginData) =>
    axios.post(`/auth/login`, login)
        .then(response => response.data)
        .catch(console.error)



