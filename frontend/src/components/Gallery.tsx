import Card from "./Card";
import "./Gallery.scss"
import {useEffect, useState} from "react";
import {fetch10Characters, fetch1Characters} from "../services/RequestService";

export default function Gallery(){
    const [Animals10, setAnimals10] = useState<any>([]);
    const [Animals1, setAnimals1] = useState<any>([]);

    useEffect( () => {
        setupAnimals1().catch(e => console.log(e.message))
        setupAnimals10().catch(e => console.log(e.message))
    },[])


    const setupAnimals1 = () => fetch1Characters().then(data => setAnimals1(data))
    const setupAnimals10 = () => fetch10Characters().then(data => setAnimals10(data))

    if (!Animals10){
        return <div className="gallery">
            <h1>loading...</h1>
        </div>
    }

    return(
        <div className="gallery">
            {Animals10.map((animal: any, index: number) => (
                <Card
                    id = {animal.id}
                    key = {animal.id}
                    image_link = {animal.image_link}
                    name = {animal.name}
                    animal_type = {animal.animal_type}
                />
            ))}
        </div>
    )
}