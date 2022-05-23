import { Form, Button, Modal } from "react-bootstrap"
import { useState } from "react"
import BoardgameService from "../../services/boardgame.service"
import { useNavigate } from "react-router-dom"
import uploadService from "../../services/upload.service"

const EditBoardgameForm = ({ id, name, description, playingTime, age, min, max }) => {

    const [boardgameState, setBoardgameState] = useState({
        name: name,
        description: description,
        playingTime: playingTime,
        age: age,
        min: min,
        max: max,
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setBoardgameState({ ...boardgameState, [name]: value })
    }

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        BoardgameService
            .editBoardgame(id, boardgameState)
            .then(() => navigate('/boardgames'))
            // {
            // closeModal()
            // })
            .catch(err => console.log(err))
    }

    const handleImageUpload = (e) => {

        setLoadingImage(true)

        const uploadImg = new FormData()
        uploadImg.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadImg)
            .then(({ data }) => {
                setLoadingImage(false)
                setBoardgameState({ ...boardgameState, gameImg: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT BOARDGAME</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="name" value={boardgameState.name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="description" value={boardgameState.description} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="playingTime">
                        <Form.Label>Playing Time</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="playingTime" value={boardgameState.playingTime} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="age" value={boardgameState.age} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="min">
                        <Form.Label>Min. Players</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="min" value={boardgameState.min} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Max. Players</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="max" value={boardgameState.max} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gameImg">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageUpload} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Create Boardgame'}</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </Form>
    )
}

export default EditBoardgameForm