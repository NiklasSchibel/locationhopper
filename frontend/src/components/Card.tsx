import "./Card.scss"

interface cardProps {
    key: string
    name: string
    id: string
    animal_type: string
    image_link: string
}

export default function Card(props: cardProps){
    return(
        <div className="card">
            <h3>{props.name}</h3>
            <img className="image" src={props.image_link} alt="Ein Bild"/>
            <ul>
                <li>{props.animal_type}</li>
                <li>{props.id}</li>
            </ul>
        </div>
    )
}