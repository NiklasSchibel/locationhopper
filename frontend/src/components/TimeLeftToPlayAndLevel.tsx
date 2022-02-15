import React, {useContext, useEffect, useState} from "react";

import './stylingComponents/TimeLeftToPlayAndLevel.scss';
import {AuthContext} from "../context/AuthProvider";
import {LevelContext} from "../context/LevelProvider";

export default function TimeLeftToPlayAndLevel() {
    const {jwtDecoded} = useContext(AuthContext)
    const {levelOfPlayer} = useContext(LevelContext)

    //ts ignore because if jwtDecoded would be undefined at this point the access
    // to pages with this page content would have been denied already
    //@ts-ignore
    const expirationNumber: number = jwtDecoded?.exp * 1000

    const expirationDateTime = new Date(expirationNumber);
    const now = new Date();
    const timeDiffUntilExpiration: number = expirationDateTime.getTime() - now.getTime()


    const padTime = (time: number) => {
        return String(time).length === 1 ? `0${time}` : `${time}`;
    };

    const format = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.round(time % 60);
        return `${minutes}:${padTime(seconds)}`;
    };

    const [counter, setCounter] = useState<number>(timeDiffUntilExpiration / 1000);

    useEffect(() => {
        let timer: NodeJS.Timeout;
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