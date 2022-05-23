import { useState } from "react"
import { Form, Modal, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from "../../services/auth.service"
import uploadService from "../../services/upload.service"

const SignupForm = ({ fireFinalActions }) => {

    const [signupData, setSignupData] = useState({
        email: '',
        description: '',
        username: '',
        password: '',
        avatar: '',
        phone: ''
    })

    // const [showModal, setShowModal] = useState(false)
    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                fireFinalActions()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const { email, username, password, description, phone } = signupData

    // PARA CLOUDINARY
    const handleImageUpload = (e) => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="FormLabel">Username</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="username" value={username} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label className="FormLabel">Phone</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="phone" value={phone} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label className="FormLabel">Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label className="FormLabel">Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label className="FormLabel">Description</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label className="FormLabel">Avatar</Form.Label>
                <Form.Control className="Avatar" type="file" onChange={handleImageUpload} />
            </Form.Group>

            <div className="d-grid gap-2">
                <Button variant="dark" className="form-button" type="submit">Signup</Button>
            </div>
        </Form >
    )
}

export default SignupForm

