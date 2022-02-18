import "./stylingPages/Level2.scss"
import {useContext, useEffect, useState} from "react";
import {fetchRandomAnimal} from "../services/RequestService";
import CardLevel2 from "../components/CardLevel2";
import {AnimalData} from "../models/AnimalData";
import TimeLeftToPlayAndLevel from "../components/TimeLeftToPlayAndLevel";
import {AuthContext} from "../context/AuthProvider";


export default function Level2() {
    const {token} = useContext(AuthContext)
    const [animal, setAnimal] = useState<AnimalData>();

    useEffect(() => {
        fetchRandomAnimal(token).then(data => setAnimal(data)).catch(e => console.log(e.message))
        // eslint-disable-next-line
    }, [])

    if (!animal) {
        return <div className="Level2Page">
            <h1>loading...</h1>
        </div>
    }

    return (
        <div>
            <TimeLeftToPlayAndLevel/>
            <div className="Level2Page">
                {animal ? <CardLevel2
                    imageLink={animal.imageLink}
                    animalName={animal.deName}
                /> : "No animal to show"}
            </div>
            <div className="filledBody"></div>
        </div>
    )
}