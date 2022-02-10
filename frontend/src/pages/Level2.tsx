import "./stylingPages/Level2.scss"
import {useEffect, useState} from "react";
import {fetchRandomAnimal} from "../services/RequestService";
import CardLevel2 from "../components/CardLevel2";
import NavBar from "../components/NavBar";
import {AnimalData} from "../models/AnimalData";

export default function Level2() {

    const [animal, setAnimal] = useState<AnimalData>();
    // const {levelOfPlayer} = useContext(LevelContext)


    useEffect(() => {
        fetchRandomAnimal().then(data => setAnimal(data)).catch(e => console.log(e.message))
    }, [])

    if (!animal) {
        return <div>
            <h1>loading...</h1>
        </div>
    }

    return (
        <div>
            <NavBar/>
            <div className="Level2Page">
                {animal ? <CardLevel2
                    id={animal.id}
                    key={animal.id}
                    imageLink={animal.imageLink}
                    animalName={animal.deName}
                /> : "No animal to show"}
            </div>
            <div className="filledBody"></div>
        </div>
    )
}