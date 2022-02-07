import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";

interface AnswerButtonChoiceProps {
    animal_type: string
    firstLetterOfAnimalName: string

}

export default function AnswerButtonChoice(props: AnswerButtonChoiceProps) {
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const [answer, setAnswer] = useState<boolean>(false);
    const [firstRandomLetter, setFirstRandomLetter] = useState<string>("");
    const [secondRandomLetter, setSecondRandomLetter] = useState<string>("");
    const choices: string[] = [props.firstLetterOfAnimalName, firstRandomLetter, secondRandomLetter]
    const [choicesShuffled, setChoicesShuffled] = useState<Array<string>>([]);

    useEffect(() => {
        setFirstRandomLetter(generateNewRandomLetter(ALPHABET,
            props.firstLetterOfAnimalName));
        }, [])

    useEffect(() => {
        setSecondRandomLetter(generateNewRandomLetter(ALPHABET,
            props.firstLetterOfAnimalName,
            firstRandomLetter));
    }, [firstRandomLetter])


    useEffect(() => {
        setChoicesShuffled(shuffleArray(choices));
    }, [secondRandomLetter])



    /**
     * returns a random Capital Letter of the Alphabet which is different from other provided letters
     * @params ALPHABET CONST in Capital Letters, Letter from which the return value should differ from
     * */
    function generateNewRandomLetter(alphabet: string, letter: string, secondLetter?: string) {
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        while (randomLetter === letter || randomLetter === secondLetter) {
            const nextRandomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            if (nextRandomLetter !== letter && nextRandomLetter !== secondLetter) {
                return nextRandomLetter;
            }
        }
        return randomLetter;
    }


    /**
     * shuffle Function from W3 Schools
     * @param array of type string
     * returns the array in shuffeld order
     * */
    function shuffleArray(array: string[]) {
        let curId = array.length;
        while (0 !== curId) {
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    }


    /**
     * this function checks if clicked Button is the correct answer and setAnswer true, if it is the case
     * @param string
     */
    const onClickHandleButton = (string: string) => {
        if (string === props.firstLetterOfAnimalName) {
            setAnswer(true)
        }
    }

    /**
     * this function returns a smile when
     * @param givenAnswer is true
     */
    const AnswerTrueComponent = (givenAnswer: boolean) => {
        if (givenAnswer) {
            return (
                <div>
                    "happy":)
                </div>)
        }
    }


    return (
        <div className="ButtonsSelection">
            <Button onClick={() => onClickHandleButton(choicesShuffled[0])}
                    className="ButtonText" variant="outlined" color="success">{choicesShuffled[0]}</Button>
            <Button onClick={() => onClickHandleButton(choicesShuffled[1])}
                    className="ButtonText" variant="outlined" color="success">{choicesShuffled[1]}</Button>
            <Button onClick={() => onClickHandleButton(choicesShuffled[2])}
                    className="ButtonText" variant="outlined" color="success">{choicesShuffled[2]}</Button>
            {AnswerTrueComponent(answer)}
        </div>
    )
}