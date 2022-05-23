import { useContext, useState } from "react"
import { Form, Button} from "react-bootstrap"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import { MessageContext } from './../../context/message.context'

const Loginform = ({ fireFinalActions }) => {

    const [loginData, setLoginData] = useState({
        password: '',
        email: ''
    })

    const { showMessage } = useContext(MessageContext)

    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                // showMessage('Bienvenid@', 'Sesión iniciada correctamente')
                fireFinalActions()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const { password, email } = loginData

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="dark" className="form-button" type="submit">Login</Button>
            </div>
        </Form >
    )
}

export default Loginform