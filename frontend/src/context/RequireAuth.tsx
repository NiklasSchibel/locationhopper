import {ReactElement, useContext} from "react";
import {AuthContext} from "./AuthProvider";
import LoginPage from "../pages/LoginPage";

export default function RequireAuth ({children} : {children:ReactElement<any,any>}){

    const {token} = useContext(AuthContext)

    return (token ? children : <LoginPage/>)
}