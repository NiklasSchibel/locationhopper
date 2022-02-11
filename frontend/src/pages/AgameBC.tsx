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
        } else if (levelOfPlayer > 2) {
            navigate("/Level3")
        } else if (levelOfPlayer > 1) {
            navigate("/Level2")
        } else if (levelOfPlayer > 0) {
            navigate("/Level1")
        }
        // eslint-disable-next-line
        }, [])

    return (<div>

        <img className="SmileImage" src={smile} alt="smile"/>

    </div>)


}

// das geht so: (ohne Auth)
// const {levelOfPlayer, setNewlevelOfPlayer} = useContext(LevelContext)
// // const navigate = useNavigate()
// if (levelOfPlayer === undefined) {
//     setNewlevelOfPlayer(1)
//     return<Level1></Level1>
// } else if (levelOfPlayer < 3) {
//     return<Level1></Level1>
// } else if (levelOfPlayer < 6) {
//     return<Level2></Level2>
// } else if (levelOfPlayer < 10) {
//     return<Level3></Level3>
// } else {
//     return <div>no more levels</div>
// }