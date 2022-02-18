import {Reorder} from "framer-motion"
import React, {useContext, useEffect, useState} from "react";
import {LevelContext} from "../context/LevelProvider";
import smile from "../images/iconSmile.png";
import {useNavigate} from "react-router-dom";
import "./stylingComponents/DragableItemsLevel3.scss"
import UseLevelStates from "../customHook/UseLevelStates";


interface DragableItemsProps {
    animalName: string
}

export default function DragableItemsLevel3({animalName}: DragableItemsProps) {
    const {level3States} = UseLevelStates()
    const {
        answer,
        setAnswer,
    } = level3States
    const {levelUp} = useContext(LevelContext)
    const navigate = useNavigate();
    const letterArrayAnimalName = animalName.split('');
    const [shuffledLettersOfAnimalName, setShuffledLettersOfAnimalName] = useState<Array<string>>([]);


    useEffect(() => {
        setShuffledLettersOfAnimalName(shuffleArray(letterArrayAnimalName))
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (checkIfArraysAreTheSame(shuffledLettersOfAnimalName, letterArrayAnimalName)) {
            setAnswer(true)
            setTimeout(function () {
                setAnswer(false)
                levelUp()
                navigate("/AgameBC")
            }, 3000);
        }
        // eslint-disable-next-line
    }, [shuffledLettersOfAnimalName])


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
            <Reorder.Group axis="y" as="ol" values={shuffledLettersOfAnimalName} onReorder={setShuffledLettersOfAnimalName}>
                {shuffledLettersOfAnimalName.map((item, key) => (
                    <Reorder.Item className="itemReorder" key={item} value={item}>
                        {item}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            {answer && <AnswerTrueComponent/>}
        </div>
    )
}

