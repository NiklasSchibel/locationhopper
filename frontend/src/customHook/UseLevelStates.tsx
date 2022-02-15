import {useState} from "react";

export default function UseLevelStates() {

    const [randomLetterForTask, setRandomLetterForTask] = useState<string>(" ")
    const [answer, setAnswer] = useState<boolean>(false)
    const [inputTextField, setInputTextField] = useState<string>("")

    return {
        level1States: {
            randomLetterForTask,
            setRandomLetterForTask,
            answer,
            setAnswer,
            inputTextField,
            setInputTextField
        },
        level2States:{
            answer,
            setAnswer
        },
        level3States:{
            answer,
            setAnswer
        }
    }
}