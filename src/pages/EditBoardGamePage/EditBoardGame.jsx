import { Container, Row, Col, Button } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import boardgameService from '../../services/boardgame.service'
import EditBoardgameForm from '../../components/EditBoardgameForm/EditBoardgameForm'

const EditBoardGamePage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <EditBoardgameForm />
                </Col>
            </Row>
        </Container>
    )

}

export default EditBoardGamePage