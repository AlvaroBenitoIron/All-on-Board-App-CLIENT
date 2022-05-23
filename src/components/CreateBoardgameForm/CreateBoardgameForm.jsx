import { useState, useEffect } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import boardgameService from "../../services/boardgame.service"
import uploadService from "../../services/upload.service"

const CreateBoardgameForm = ({ fireFinalActions }) => {

    const [createBoargameData, setcreateBoargameData] = useState({
        name: '',
        gameImg: '',
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
        setcreateBoargameData({
            ...createBoargameData,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        boardgameService
            .createBoardgame(createBoargameData)
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
                setcreateBoargameData({ ...createBoargameData, gameImg: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const { name } = createBoargameData
    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name{tab}
                    <select name="name" value={name} onChange={handleInputChange}>
                        {
                            boardgamesData[0]?.map(game => {
                                return (
                                    <option value={game?.name}>{game?.name}</option>
                                )

                            })
                        }
                    </select>
                </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="gameImg">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>

            <Modal.Footer>

                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Create Boardgame'}</Button>

                {/* <button className="Delete" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Create Boardgame'}>
                    <span class="button_top">
                    </span>
                </button > */}

            </Modal.Footer>
        </Form>
    )
}

export default CreateBoardgameForm