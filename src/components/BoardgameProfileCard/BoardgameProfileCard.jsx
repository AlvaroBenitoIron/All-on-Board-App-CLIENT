import { Card, Row, Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./BoardgameProfileCard.css"

const BoardgameProfileCard = ({ myGames }) => {

    return (
        <Container>
            <Row >

                <>
                    {
                        myGames?.map((elm) => {
                            return <Col md={{ span: 4 }} key={elm._id}>
                                <Card className="CardBGRent">
                                    <Link to={`/boardgames/${elm._id}`}>
                                        <Card.Body>
                                            <Card.Title className="CardBGRentTitle" >{elm.name}</Card.Title>
                                            <p>{elm.description} </p>
                                        </Card.Body>

                                        <img className='RentCardImg' src={elm.gameImg}></img>
                                    </Link>
                                </Card>
                            </Col>
                        })
                    }
                </>
            </Row >
        </Container >
    )
}

export default BoardgameProfileCard