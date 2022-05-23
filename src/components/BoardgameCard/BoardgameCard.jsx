import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./BoardgameCard.css"

const BoardgameCard = ({ _id, gameImg, name }) => {

    return (
        <Link className="LinkBoardGame" to={`/boardgames/${_id}`}>
            <Card className="BoardgameCardList BoardgameCardCarrousel">
                <Card.Img className="image imageList" variant="top" src={gameImg} />
                <Card.Title className="text-title-list text-title ">{name}</Card.Title>
            </Card >
        </Link>
    )
}

export default BoardgameCard