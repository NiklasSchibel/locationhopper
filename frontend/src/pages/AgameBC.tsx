import React, {useContext, useEffect} from "react";
import {LevelContext} from "../context/LevelProvider";
import {useNavigate} from "react-router-dom";
import {KEY, POINTS_NEEDED_FOR_LEVEL_2, POINTS_NEEDED_FOR_LEVEL_3} from "../constants/Constants";

export default function AgameBC() {

    const {levelOfPlayer, setNewlevelOfPlayer} = useContext(LevelContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (levelOfPlayer === undefined) {
            setNewlevelOfPlayer(1)
            navigate("/Level1")
        } else if (levelOfPlayer > POINTS_NEEDED_FOR_LEVEL_3) {
            navigate("/Level3")
        } else if (levelOfPlayer > POINTS_NEEDED_FOR_LEVEL_2) {
            navigate("/Level2")
        } else {
            navigate("/Level1")
        }
        // eslint-disable-next-line
        }, [])

    if(KEY === undefined){
        console.warn("environment key for API connection is undefined")
        return <div>Problem mit API-Key: Verbindung zu Text-To-Speech API nicht möglich</div>
    }

    return (<div className="smileImage">

    </div>)
}
