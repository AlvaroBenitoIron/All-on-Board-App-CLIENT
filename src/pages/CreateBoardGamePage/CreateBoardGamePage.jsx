import { Container, Row, Col, Modal } from "react-bootstrap";
import CreateBoardgameForm from "../../components/CreateBoardgameForm/CreateBoardgameForm.jsx"
import { MessageContext } from './../../context/message.context'
import { useState, useContext } from "react"

const CreateBoardgamePage = () => {

    const { showMessage } = useContext(MessageContext)

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
        showMessage('COMPLETE', 'NEW BOARDGAME CREATED')
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>CREATE NEW BOARDGAME</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreateBoardgameForm fireFinalActions={fireFinalActions} />
                        </Modal.Body>

                    </Modal>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateBoardgamePage