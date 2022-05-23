import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'
import { useState, useContext } from "react"

const SignupPage = () => {

    const { showMessage } = useContext(MessageContext)

    const [showModal, setShowModal] = useState(false)

    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        showMessage('SIGN UP COMPLETE', 'LOGIN AND START THE FANTASY')
        closeModal()
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <SignupForm fireFinalActions={fireFinalActions} />
                </Col>
            </Row>
        </Container>
    )
}

export default SignupPage