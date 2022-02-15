import React, {useContext} from "react";
import './stylingComponents/TimeLeftToPlayAndLevel.scss';
import {AuthContext} from "../context/AuthProvider";
import {LevelContext} from "../context/LevelProvider";

export default function TimeLeftToPlayAndLevel() {
    const {jwtDecoded} = useContext(AuthContext)
    const {levelOfPlayer} = useContext(LevelContext)


    //returns just different formats of time maybe usefull for further feature
    //@ts-ignore
    const DateNumber: number = jwtDecoded?.exp * 1000
    //@ts-ignore
    const ExpirationDate = new Date(DateNumber);

    const now = new Date();



    const diff = ExpirationDate.getTime() - now.getTime()





    //@ts-ignore
    const padTime = time => {
        return String(time).length === 1 ? `0${time}` : `${time}`;
    };

    //@ts-ignore
    const format = time => {
        // Convert seconds into minutes and take the whole part
        const minutes = Math.floor(time / 60);

        // Get the seconds left after converting minutes
        const seconds = Math.round(time % 60);

        //Return combined values as string in format mm:ss
        return `${minutes}:${padTime(seconds)}`;
    };
    const [counter, setCounter] = React.useState(diff/1000);

    React.useEffect(() => {
        let timer:any;
        if (counter > 0) {
            timer = setTimeout(() => setCounter(c => c - 1), 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [counter]);




    return (
            <div className="timeLeftToPlayAndLevel">
                {counter === 0 ? "Time over" : <div className="timeLeft"> {format(counter)}</div>}
                <div className="levelOfPlayer">{levelOfPlayer}</div>
            </div>
    )
}