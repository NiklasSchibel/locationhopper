import './stylingComponents/NavBar.scss';
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <div className="navbar">
            <Link className={"nav-item"} to="/TestPage">TestPage</Link>
            <Link className={"nav-item"} to="/Login">Login</Link>
            <Link className={"nav-item"} to="/AgameBC">AgameBC</Link>
        </div>
    )
}