import {createContext, ReactElement, useState} from "react";

export interface LevelContextType {
    levelOfPlayer?: number
    setNewlevelOfPlayer: (newLevel: number) => void
    levelUp: () => void
    checkIfNextLevelIsReached:(levelPointsNeeded: number)=>boolean
}

export const LevelContext = createContext<LevelContextType>({
    setNewlevelOfPlayer: () => {
        throw Error("defaut setNewLevel function has not been initialized")
    },
    levelUp: () => {
        throw Error("defaut levelUp function has not been initialized")
    },
    checkIfNextLevelIsReached: () => {
        throw Error("defaut checkIfNextLevelIsReached function has not been initialized")
    }
})

export default function LevelProvider({children}: { children: ReactElement<any, any> }) {

    const [levelOfPlayer, setLevelOfPlayer] = useState<number>(1)

    const setNewlevelOfPlayer = (newLevel: number) => {
        setLevelOfPlayer(newLevel)
    }

    const levelUp = () => {
        if (levelOfPlayer === undefined) {
            setNewlevelOfPlayer(1)
        } else {
            const newLevel: number = levelOfPlayer + 1;
            setNewlevelOfPlayer(newLevel)
        }
    }

    const checkIfNextLevelIsReached = (levelPointsNeeded: number): boolean => {
        return (levelOfPlayer > levelPointsNeeded)
    }


    return (
        <LevelContext.Provider
            value={{levelOfPlayer: levelOfPlayer,
                setNewlevelOfPlayer: setNewlevelOfPlayer,
                levelUp: levelUp,
                checkIfNextLevelIsReached:checkIfNextLevelIsReached}}>
            {children}
        </LevelContext.Provider>
    )
}