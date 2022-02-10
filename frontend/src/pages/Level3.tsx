import "./stylingPages/Level3.scss"
import React, {useEffect, useState} from 'react';
import DragableItemsLevel3 from "../components/DragableItemsLevel3";
import {fetchRandomAnimal} from "../services/RequestService";
import NavBar from "../components/NavBar";
import {AnimalData} from "../models/AnimalData";
import {useNavigate} from "react-router-dom";


export default function Level3() {
    const [animal, setAnimal] = useState<AnimalData>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRandomAnimal().then(data => setAnimal(data)).catch(e => console.log(e.message))

        // eslint-disable-next-line
    }, [])


    if (animal === undefined || checkOnDoubleLetterInAnimalName(animal.deName)) {
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
        return <div>
            <h1>loading...</h1>
        </div>
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className={"Level3Page"}>
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

