import React from 'react';
import './App.css';
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RequireAuth from "./context/RequireAuth";
import AgameBC from "./pages/AgameBC";
import LevelProvider from "./context/LevelProvider";
import Level1 from "./pages/Level1";
import Level2 from "./pages/Level2";
import Level3 from "./pages/Level3";
import Results from "./pages/Results";

export default function App() {
    return (
        <AuthProvider>
            <LevelProvider>
                <BrowserRouter>
                    <Routes>

                        <Route path="*" element={<Login/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/AgameBC" element={
                            <RequireAuth>
                                <AgameBC/>
                            </RequireAuth>}/>
                        <Route path="/Level1" element={
                            <RequireAuth>
                                <Level1/>
                            </RequireAuth>}/>
                        <Route path="/Level2" element={
                            <RequireAuth>
                                <Level2/>
                            </RequireAuth>}/>
                        <Route path="/Level3" element={
                            <RequireAuth>
                                <Level3/>
                            </RequireAuth>}/>
                        <Route path="/results" element={
                            <RequireAuth>
                                <Results/>
                            </RequireAuth>
                        }/>

                    </Routes>
                </BrowserRouter>
            </LevelProvider>
        </AuthProvider>
    );
}