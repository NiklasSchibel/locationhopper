import "./Card.scss"
import React, {useState} from "react";
import {Button} from "@mui/material";


interface cardProps {
    key: string
    name: string
    id: string
    animal_type: string
    image_link: string
    latin_name: string
}

export default function Card(props: cardProps) {
    const {animal_type, image_link} = props
    const [text, setText] = useState<string>('');
    const language: string = "de-de";
    const standardtext: string ="mit welchem Buchstaben beginnt mein Name, ich heiße";
    //todo: set key later in environment
    const key: string = "a7aae25de0b446c7adc2571316a7ddfc&";

    /**
     * returns a new string with the first word of the
     * @param sentence
     * */
    function getFirstWord (sentence: string):string {
        if (sentence !== undefined && sentence.includes(" ")) {
            return sentence.split(" ")[0];
        } else {
            return sentence;
        }
    }


    //todo: this works for the first time clicking on the picture than only clicking on the play button
    const onClickHandle = () => {
        setText(srcString);
    }

    //todo: images load to slow

    const srcString: string = "https://api.voicerss.org/?key=" + key + "hl=" + language + "&src=" + standardtext + getFirstWord(animal_type);
    return (
        <div onClick={onClickHandle} className="card">
            <img className="image" src={image_link} alt="Ein Bild"/>
            <React.Fragment>
                <h4>{getFirstWord(animal_type)}</h4>
                <audio autoPlay src={text} controls/>
            </React.Fragment>

            <div className="ButtonsSelection">
                <Button className="ButtonText" variant="outlined">A</Button>
                <Button className="ButtonText" variant="contained" color ="success">B</Button>
                <Button className="ButtonText" variant="text" color ="success">C</Button>
            </div>
        </div>
    )
}