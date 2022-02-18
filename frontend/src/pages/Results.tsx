import {getResults} from "../services/RequestService";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import './stylingPages/Results.scss';
// @ts-ignore
import {TagCloud} from 'react-tagcloud';
import {ResultData} from "../models/ResultData";
import {BASEURL_TTS, KEY, LANGUAGE} from "../constants/Constants";

export default function Results() {
    const {token} = useContext(AuthContext)
    const [results, setResults] = useState<ResultData>({})
    const [text, setText] = useState<string>("das ist dein Alphabet, klicke auf einen Buchstaben")

    const srcStringForVoiceRSS: string = BASEURL_TTS + KEY + LANGUAGE + text

    useEffect(() => {
        getResults(token)
            .then(result => {
                return result;
            })
            .then(result => setResults(result.lettersCount))
            .catch(error => console.log(error))
        // eslint-disable-next-line
    }, [])


    const data = [
        {value: 'A', count: results.A},
        {value: 'B', count: results.B},
        {value: 'C', count: results.C},
        {value: 'D', count: results.D},
        {value: 'E', count: results.E},
        {value: 'F', count: results.F},
        {value: 'G', count: results.G},
        {value: 'H', count: results.H},
        {value: 'I', count: results.I},
        {value: 'J', count: results.J},
        {value: 'K', count: results.K},
        {value: 'L', count: results.L},
        {value: 'M', count: results.M},
        {value: 'N', count: results.N},
        {value: 'O', count: results.O},
        {value: 'P', count: results.P},
        {value: 'Q', count: results.Q},
        {value: 'R', count: results.R},
        {value: 'S', count: results.S},
        {value: 'T', count: results.T},
        {value: 'U', count: results.U},
        {value: 'V', count: results.V},
        {value: 'W', count: results.W},
        {value: 'X', count: results.X},
        {value: 'Y', count: results.Y},
        {value: 'Z', count: results.Z},
    ]

    const allDataObject: ResultData = data.reduce(
        (obj, item) => Object.assign(obj, {[item.value]: item.count}), {});

    const letterCountMap = new Map(Object.entries(allDataObject));

    function onClickHandle(letter: string) {
        setText("das ist der Buchstabe: " + letter + "Du hast ihn schon" + letterCountMap.get(letter) + " mal gelernt.")
    }

    return (
        <div className="resultsPage">
            <TagCloud className="tagCloud"
                      minSize={10}
                      maxSize={120}
                      tags={data}
                      onClick={(tag: { value: any; }) => onClickHandle(tag.value)}
            />

            <audio className="audioResult" autoPlay src={srcStringForVoiceRSS} controls/>
        </div>)
}