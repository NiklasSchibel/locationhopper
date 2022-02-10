import './stylingPages/Level1.scss';
import React, {ChangeEventHandler, useContext, useEffect, useState} from "react";
import {TextField} from "@mui/material";
import smile from "../images/iconSmile.png";
import {LevelContext} from "../context/LevelProvider";
import {useNavigate} from "react-router-dom";


export default function Level1() {
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const LANGUAGE: string = "de-de"
    const STANDARDTEXTVOICE: string = "das ist der Buchstabe "
    const navigate = useNavigate()
    const {levelUp} = useContext(LevelContext)
    const [randomLetter, setRandomLetter] = useState<string>(" ")

    const requiredLetter: string = randomLetter;
    const [answer, setAnswer] = useState<boolean>(false)
    const [text, setText] = useState<string>('');



    const [inputText] = useState<string>("")


    useEffect(() => {
        setRandomLetter(ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
    }, [])


    //todo: set key later in environment
    const key: string = "a7aae25de0b446c7adc2571316a7ddfc&";
    const srcString: string = "https://api.voicerss.org/?key="
        + key + "hl=" + LANGUAGE + "&src="
        + STANDARDTEXTVOICE + randomLetter + ".schreibe ihn in dem Feld unten selbst";


    const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
        = (event) => {
        event.preventDefault();
        if (requiredLetter === event.target.value.toUpperCase()) {
            setAnswer(true)
            setTimeout(function () {
                setAnswer(false)
                levelUp()
                navigate("/AgameBC")
            }, 3000);
            console.log("same letter true in on change function")
        }
        console.log("onChange function lief")
    }


    //todo: this works for the first time clicking on the picture than only clicking on the play button
    const onClickHandleCard = () => {
        setText(srcString);
    }


    /**
     * this function returns a smile when
     * @param givenAnswer is true
     */
    const AnswerTrueComponent = () => {
        return (
            <div>
                <img className="SmileImage" src={smile} alt="smile"/>
            </div>)
    }

    return (
        <div>
            {/*<NavBar></NavBar>*/}
            <div>levelpoints and time Left to play Feature</div>
            <div onClick={onClickHandleCard} className="Level1Page">
                <h1>{requiredLetter}</h1>
                <audio autoPlay src={text} controls/>
                <TextField
                    id="outlined"
                    autoComplete="new-password"
                    placeholder={requiredLetter}
                    value={inputText}
                    color="success"
                    onChange={handleChange}
                    type="text"
                    inputProps={{
                        maxLength: 1,
                        form: {
                            autoComplete: 'new-password',
                        },
                    }}
                />
                {answer && <AnswerTrueComponent/>}
            </div>
        </div>
    )
}