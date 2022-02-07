import "./Header.scss"

interface headerProps{
    name: string
}

export default function Header(props: headerProps){
    return(<div className="header">
            <h1>{props.name}</h1>
        </div>
    )
}