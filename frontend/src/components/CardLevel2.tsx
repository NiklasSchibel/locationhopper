import "./stylingComponents/CardLevel2.scss"
import AnswerChoiceLevel2 from "./AnswerChoiceLevel2";
import {BASEURL_TTS, KEY, LANGUAGE} from "../constants/Constants";

interface cardProps {
    animalName: string
    imageLink: string
}

export default function CardLevel2({animalName, imageLink}: cardProps) {
    const firstLetterOfAnimalName = getFirstLetter(animalName);


    const srcStringForVoiceRSS: string = BASEURL_TTS + KEY + LANGUAGE
        + "Welcher ist der erste Buchstabe, ich heiße:" + getFirstWord(animalName)



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



    return (
        <div className="card">
            <img className="image" src={imageLink} alt="Ein Bild"/>
            <h4>{getFirstWord(animalName)}</h4>
            <audio autoPlay src={srcStringForVoiceRSS} controls/>
            <AnswerChoiceLevel2
                firstLetterOfAnimalName={firstLetterOfAnimalName}
            />
        </div>
    )
}