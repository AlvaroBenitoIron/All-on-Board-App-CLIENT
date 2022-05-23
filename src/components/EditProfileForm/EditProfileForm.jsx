import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import userService from "../../services/user.service"


const EditProfileForm = ({user_id, email, username, avatar }) => {
//TENGO QUE SACAR EL ID PARA ACTUALIZAR EL PERFIL 
    
    const [userState, setUserState] = useState({
        email: email,
        username: username,
        avatar: avatar,
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setUserState({
            ...userState,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        userService
            .editUser(user_id, userState)
            .then(() => {
                // closeModal()
                // refreshDetails()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" value={userState.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control as="text" name="username" value={userState.username} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control as="" name="avatar" value={userState.avatar} onChange={handleInputChange} />
                </Form.Group>
                {/* //CLOUDINARY */}
                
                <Button variant="dark" type="submit">Save profile</Button>

            </Form>
        </>
    )
}

export default EditProfileForm