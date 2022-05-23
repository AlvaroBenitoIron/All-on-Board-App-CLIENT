import { useState, useEffect } from "react"
import { Form, Modal, Button, Row, Container, Col } from "react-bootstrap"
import boardgameService from "../../services/boardgame.service"
import uploadService from "../../services/upload.service"

const AdminBoardgameForm = ({ fireFinalActions }) => {

    const [adminBoargameData, setAdminBoargameData] = useState({
        name: '',
        description: '',
        playingTime: '',
        age: '',
        gameImg: '',
        kind: undefined,
        min: 0,
        max: 0
    })

    const [boardgamesData, setBoardgamesData] = useState([])

    useEffect(() => {
        boardgameService
            .getOriginalBoardgames()
            .then(({ data }) => {
                setBoardgamesData(data)
            })
    }, [])

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.currentTarget
        setAdminBoargameData({
            ...adminBoargameData,
            [name]: value,
            kind: kind

        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        boardgameService
            .createBoardgame(adminBoargameData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    // PARA CLOUDINARY
    const handleImageUpload = (e) => {

        setLoadingImage(true)

        const uploadImg = new FormData()
        uploadImg.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadImg)
            .then(({ data }) => {
                setLoadingImage(false)
                setAdminBoargameData({ ...adminBoargameData, gameImg: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const { name, description, playingTime, age, kind, players } = adminBoargameData
    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>

    return (

        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="name" value={name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
                    </Form.Group>
                    <Col>
                        <Form.Group className="mb-3" controlId="playingTime">
                            <Form.Label>Playing Time</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="playingTime" value={playingTime} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="age" value={age} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="players.min">
                            <Form.Label>Min. Players</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="min" value={players?.min} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="players.max">
                            <Form.Label>Max. Players</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="max" value={players?.max} />
                        </Form.Group>
                    </Col>

                    <Form.Group className="mb-3" controlId="kind">
                        <Form.Label>Kind{tab}
                            <select name="kind" value={kind} onChange={handleInputChange}>
                                <option value='ORIGINAL'>ORIGINAL</option>
                                <option value='RENT'>RENT</option>
                            </select>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gameImg">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageUpload} />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Create Boardgame'}</Button>
                    </Modal.Footer>
                </Row>
            </Container>
        </Form>
    )
}

export default AdminBoardgameForm