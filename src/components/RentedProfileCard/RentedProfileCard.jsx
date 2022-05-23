import { Card, Row, Container, Col } from 'react-bootstrap'
import "./RentedProfileCard.css"

const RentedProfileCard = ({ rentedGames }) => {

    return (
        <Container>
            <Row>
                <>
                    {
                        rentedGames?.map((elm) => {
                            return <Col md={{ span: 6 }} key={elm._id}>
                                <Card className="CardBGRented">
                                    <Card.Body>
                                        <Card.Title className="CardBGRentTitle">{elm.boardGame.name}</Card.Title>
                                        <div className="CardBGRentDescription">
                                            <p>Booked Date: {elm.startDate.slice(0, 10)} to {elm.endDate.slice(0, 10)} </p>
                                            <p>Contact Phone: 659856582</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        })
                    }
                </>
            </Row>
        </Container>
    )
}

export default RentedProfileCard