import React, {useContext} from "react";
import '../App.css';
import NavBar from "../components/NavBar";
import {AuthContext} from "../context/AuthProvider";

export default function TestPageAfterLogin () {
    const {jwtDecoded} = useContext(AuthContext)

    //returns just different formats of time maybe usefull for further feature
    //@ts-ignore
    const DateNumber: number = jwtDecoded?.exp *1000
    //@ts-ignore
    const ExpirationDate = new Date(DateNumber);

    const now = new Date();

    return (
        <div className="App">
            <NavBar/>
            <header className="App-header">
                TestPage for Login
            </header>
            <div>Expiration Token number:</div>
            <div> {DateNumber}</div>
            <div>Expiration Date.toTimeString:</div>
            <div> {ExpirationDate.toTimeString()}</div>
            <div>Expiration Date.toString:</div>
            <div> {ExpirationDate.toString()}</div>
            <div>Expiration Token number:</div>
            <div>{ExpirationDate.getTime()}</div>
            <div>Date now date:</div>
            <div>{now.toString()}</div>
            <div>Date now number:</div>
            <div>{now.getTime()}</div>
            <div>Date now diff number:</div>
            <div>{ExpirationDate.getTime() - now.getTime()}</div>
        </div>
    )
}