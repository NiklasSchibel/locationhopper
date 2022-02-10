import "./stylingComponents/CardLevel2.scss"
import {useState} from "react";
import AnswerChoiceLevel2 from "./AnswerChoiceLevel2";

interface cardProps {
    key: string
    animalName: string
    id: string
    imageLink: string
}

export default function CardLevel2({animalName, imageLink}: cardProps) {
    const LANGUAGE: string = "de-de";
    const STANDARDTEXTVOICE: string = "Welcher ist der erste Buchstabe, ich heiße:";
    const firstLetterOfAnimalName = getFirstLetter(animalName);
    const [text, setText] = useState<string>('');


    //todo: set key later in environment
    const key: string = "a7aae25de0b446c7adc2571316a7ddfc&";
    const srcString: string = "https://api.voicerss.org/?key="
        + key + "hl=" + LANGUAGE + "&src="
        + STANDARDTEXTVOICE + getFirstWord(animalName);


    /**
     * returns a new string with the first word of the sentence provided
     * @param sentence
     * */
    function getFirstWord(sentence: string): string {
        if (sentence !== undefined && sentence.includes(" ")) {
            return sentence.split(" ")[0];
        } else {
            return sentence;
        }
    }

    /**
     * returns the first letter of the word provided
     * @param word
     * */
    function getFirstLetter(word: string): string {
        if (word !== undefined && word.length > 2) {
            return word.slice(0, 1);
        } else {
            return word;
        }
    }


    //todo: this works for the first time clicking on the picture than only clicking on the play button
    const onClickHandleCard = () => {
        setText(srcString);
    }



    return (
        <div onClick={onClickHandleCard} className="card">
            <img className="image" src={imageLink} alt="Ein Bild"/>
            <h4>{animalName}</h4>
            <audio autoPlay src={text} controls/>
            <AnswerChoiceLevel2
                animal_name={animalName}
                firstLetterOfAnimalName={firstLetterOfAnimalName}
            />
        </div>
    )
}