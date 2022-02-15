import React, {useContext, useEffect} from "react";
import {LevelContext} from "../context/LevelProvider";
import smile from "../images/iconSmile.png";
import {useNavigate} from "react-router-dom";

export default function AgameBC() {

    const {levelOfPlayer, setNewlevelOfPlayer} = useContext(LevelContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (levelOfPlayer === undefined) {
            setNewlevelOfPlayer(1)
        } else if (levelOfPlayer > 10) {
            navigate("/Level3")
        } else if (levelOfPlayer > 1) {
            navigate("/Level2")
        } else if (levelOfPlayer > 0) {
            navigate("/Level1")
        }
        // eslint-disable-next-line
        }, [])

    return (<div className="smileImage">

        {/*<img className="smileImage" src={smile} alt="smile"/>*/}

    </div>)


}
