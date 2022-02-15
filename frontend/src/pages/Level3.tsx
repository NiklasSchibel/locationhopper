import "./stylingPages/Level3.scss"
import React, {useEffect, useState} from 'react';
import DragableItemsLevel3 from "../components/DragableItemsLevel3";
import {fetchRandomAnimal} from "../services/RequestService";
import {AnimalData} from "../models/AnimalData";
import {useNavigate} from "react-router-dom";
import TimeLeftToPlayAndLevel from "../components/TimeLeftToPlayAndLevel";


export default function Level3() {
    const [animal, setAnimal] = useState<AnimalData>();
    const navigate = useNavigate();
    const LANGUAGE: string = "de-de"
    const STANDARDTEXTVOICE: string = "Ordne die Buchstaben von oben nach unten wie bei, "

    useEffect(() => {
        fetchRandomAnimal().then(data => setAnimal(data)).catch(e => console.log(e.message))
        // eslint-disable-next-line
    }, [])


    //todo: set key later in environment
    const key: string = "a7aae25de0b446c7adc2571316a7ddfc&";
    const srcString: string = "https://api.voicerss.org/?key="
        + key + "hl=" + LANGUAGE + "&src="
        + STANDARDTEXTVOICE + animal?.deName;

    if (animal === undefined || checkOnDoubleLetterInAnimalName(animal.deName) || animal.deName.length > 7) {
        console.log("test: gleiche buchstaben, deswegen wechsel zu AGameBC und anschließend neuer fetch")
        navigate("/AGameBC")
    }

    function checkOnDoubleLetterInAnimalName(AnimalName: string): boolean {
        const animalstring = getStringOfAnimalName(AnimalName)
        const letterArray = animalstring.split('');
        const setOfletterArray = new Set(letterArray);
        console.log(letterArray.length);
        console.log(setOfletterArray.size);
        return (letterArray.length !== setOfletterArray.size)
    }

    //todo Gecko Fallback anders lösen
    /**
     * returns an array of string from the param input, and handling the undefined case
     * @param word
     * */
    function getStringOfAnimalName(word: string): string {
        if (word !== undefined && word.length > 1) {
            return word;
        } else {
            return "Gecko";
        }
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

                <audio autoPlay src={srcString} controls/>
                <DragableItemsLevel3
                    id={animal.id}
                    key={animal.id}
                    imageLink={animal.imageLink}
                    animalName={animal.deName}
                />
            </div>
        </div>
    )
}

