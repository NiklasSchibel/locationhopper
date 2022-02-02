import {ReactElement, useContext} from "react";
import {AuthContext} from "./AuthProvider";
import LoginPage from "../pages/LoginPage";

export default function RequireAuth({children}: { children: ReactElement<any, any> }) {

    const {jwtDecoded} = useContext(AuthContext)

    function isExpirationValid(): boolean {
        const Now = new Date();
        //@ts-ignore
        const ExpirationTimeToken = new Date(jwtDecoded?.exp * 1000);
        const TimeLeftToPlay: number = ExpirationTimeToken.getTime() - Now.getTime()
        return (TimeLeftToPlay > 0)
    }

    if (jwtDecoded?.exp && isExpirationValid()) {
        return children;
    } else {
        return <LoginPage/>
    }
}

