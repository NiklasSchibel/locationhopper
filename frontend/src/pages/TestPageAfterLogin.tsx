import React from "react";
import '../App.css';
import NavBar from "../components/NavBar";

export default function TestPageAfterLogin () {
    return (
        <div className="App">
            <NavBar/>
            <header className="App-header">
                TestHeader
            </header>
            <div>testpage for Login</div>
        </div>
    )
}