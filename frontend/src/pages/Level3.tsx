import "./stylingPages/Level3.scss"
import React, {useContext, useEffect, useState} from 'react';
import DragableItemsLevel3 from "../components/DragableItemsLevel3";
import {fetchRandomAnimal} from "../services/RequestService";
import {AnimalData} from "../models/AnimalData";
import {useNavigate} from "react-router-dom";
import TimeLeftToPlayAndLevel from "../components/TimeLeftToPlayAndLevel";
import {LANGUAGE, BASEURL_TTS, KEY} from "../constants/Constants";
import {AuthContext} from "../context/AuthProvider";


export default function Level3() {
    const {token} = useContext(AuthContext)
    const [animal, setAnimal] = useState<AnimalData>();
    const navigate = useNavigate();


    useEffect(() => {
        fetchRandomAnimal(token).then(data => setAnimal(data)).catch(e => console.log(e.message))
        // eslint-disable-next-line
    }, [])


    const srcStringForVoiceRSS: string = BASEURL_TTS + KEY + LANGUAGE
        + "Ordne die Buchstaben von oben nach unten wie bei, "
        + animal?.deName


    if (animal === undefined || checkOnDoubleLetterInAnimalName(animal.deName) || animal.deName.length > 7) {
        navigate("/AGameBC")
    }

    /**
     * checks if AnimalName has double letter
     * @param AnimalName
     */
    function checkOnDoubleLetterInAnimalName(AnimalName: string): boolean {
        const letterArray = AnimalName.split('');
        const setOfletterArray = new Set(letterArray);
        return (letterArray.length !== setOfletterArray.size)
    }


    if (!animal) {
        return <div className={"level3Page"}>
            <h1>loading...</h1>
        </div>
    }

    return (
        <div>
            <TimeLeftToPlayAndLevel/>
            <div className={"level3Page"}>
                <audio autoPlay src={srcStringForVoiceRSS} controls/>
                <h4>{animal.deName}</h4>
                <DragableItemsLevel3
                    animalName={animal.deName}
                />
            </div>
        </div>
    )
}

