import { Container, Row, Col } from 'react-bootstrap'
import BookingForm from '../../components/BookingForm/BookingForm'

const BoardgameRentPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <BookingForm />
                </Col>
            </Row>
        </Container>
    )
}

export default BoardgameRentPage