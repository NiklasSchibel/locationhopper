import {Reorder} from "framer-motion"
import React, {useContext, useEffect, useState} from "react";
import {LevelContext} from "../context/LevelProvider";
import smile from "../images/iconSmile.png";
import {useNavigate} from "react-router-dom";

interface DragableItemsProps {
    key: string
    animalName: string
    id: string
    imageLink: string
}

export default function DragableItemsLevel3({animalName}: DragableItemsProps) {
    const [answer, setAnswer] = useState<boolean>(false);
    const navigate = useNavigate();
    // const letterString: String = new String(props.animalName); // the constructor leads to a warning but no work around found yet
    const letterstring: string = getStringOfAnimalName(animalName); // does not work because of "can not read properties of undefined"
    const letterArray = letterstring.split(''); //this is an string[]
    // const [letters, setLetters] = useState(letterArray)
    const [choicesShuffled, setChoicesShuffled] = useState<Array<string>>([]);
    const {levelUp} = useContext(LevelContext)

    useEffect(() => {
        setChoicesShuffled(shuffleArray(letterArray))
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (checkIfArraysAreTheSame(choicesShuffled, letterArray)) {
            setAnswer(true)
            setTimeout(function () {
                setAnswer(false)
                levelUp()
                navigate("/AgameBC")
            }, 3000);
        }
        // eslint-disable-next-line
    }, [choicesShuffled])


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

    function checkIfArraysAreTheSame(stringArray1: string[], stringArray2: string[]): boolean {
        return (JSON.stringify(stringArray1) === JSON.stringify(stringArray2))
    }


    /**
     * this function returns a smile when called
     */
    const AnswerTrueComponent = () => {
        return (
            <div>
                <img className="SmileImage" src={smile} alt="smile"/>
            </div>)
    }

    return (
        <div>
            <h2>{animalName}</h2>
            <Reorder.Group axis="y" values={choicesShuffled} onReorder={setChoicesShuffled}>
                {choicesShuffled.map((item, key) => (
                    <Reorder.Item key={item} value={item}>
                        {item}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            {answer && <AnswerTrueComponent/>}
        </div>
    )
}