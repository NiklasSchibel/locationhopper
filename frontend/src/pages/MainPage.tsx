import Header from "../components/Header";
import Gallery from "../components/Gallery";

export default function MainPage(){
    return(
        <div className="mainPage">
            <Header name="Animal Zoo API"/>
            <Gallery/>
        </div>
    )
}