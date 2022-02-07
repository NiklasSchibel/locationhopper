import Card from "./Card";
import "./Gallery.scss"
import {useEffect, useState} from "react";

import {fetch1Characters} from "../services/RequestService";

export default function Gallery(){
    const [Animals1, setAnimals1] = useState<any>([]);

    useEffect( () => {
        setupAnimals1().catch(e => console.log(e.message))
    },[])


    const setupAnimals1 = () => fetch1Characters().then(data => setAnimals1(data))


    if (!Animals1){
        return <div className="gallery">
            <h1>loading...</h1>
        </div>
    }

    return(
        <div className="gallery">
                <Card
                    id = {Animals1.id}
                    key = {Animals1.id}
                    image_link = {Animals1.image_link}
                    name = {Animals1.name}
                    animal_type = {Animals1.animal_type}
                    latin_name = {Animals1.latin_name}
                />
        </div>
    )
}