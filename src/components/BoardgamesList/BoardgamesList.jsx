import { Row, Col } from "react-bootstrap"
import BoardgameCard from "../BoardgameCard/BoardgameCard"
import './BoardgamesList.css'

const BoardgamesList = ({ boardgames }) => {
    return (
        <div className="BoardgamesList" >
            <>
                <Row>
                    {
                        boardgames?.map(game => {
                            return (
                                <Col md={{ span: 4 }} key={game._id}>
                                    <BoardgameCard {...game} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </>
        </div>
    )
}

export default BoardgamesList


