import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Container, Nav, Modal, Button, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react"
import "./AdminPage.css"
import userService from "../../services/user.service"
import UserList from "../../components/UserList/UserList"
import AdminBoardgameForm from "../../components/AdminBoardgameForm/AdminBoardgameForm"
import AdminEventForm from "../../components/AdminEventForm/AdminEventForm"


const AdminPage = () => {

    const { user } = useContext(AuthContext)

    const [allUser, setAllUsers] = useState([])

    const [showAdminBoardgameModal, setShowAdminBoardgameModal] = useState(false)
    const handleAdminBoardgameModalClose = () => setShowAdminBoardgameModal(false)
    const handleAdminBoardgameModalOpen = () => setShowAdminBoardgameModal(true)

    const [showAdminEventModal, setShowAdminEventModal] = useState(false)
    const handleAdminEventModalClose = () => setShowAdminEventModal(false)
    const handleAdminEventModalOpen = () => setShowAdminEventModal(true)


    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        userService
            .getUsers()
            .then(({ data }) => setAllUsers(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        handleAdminBoardgameModalClose()
        handleAdminEventModalClose()
    }

    return (
        <div className="UserAdmin">
        <Container>
            <Row className="UserlistRow" >

                <Col className="Userlist">
                    <UserList allUser={allUser} />
                </Col>


                <Col className="AdminPower" >
                    <div>
                        <h2 className="AdminButtonsTitle"> I GOT THE POWER!! </h2>
                    </div>
                    <div className="AdminButtons">
                        <NavLink to='#' >
                                <Nav.Link className='elm' as="span" onClick={handleAdminBoardgameModalOpen}>
                                    
                                    {/* <Button variant="dark" type="">Create new Boardgame</Button> */}

                                    <button >
                                        <span class="button_top"> Create new Boardgame
                                        </span>
                                    </button >

                                
                                </Nav.Link>
                        </NavLink>

                        <NavLink to='#' >
                                <Nav.Link className='elm' as="span" onClick={handleAdminEventModalOpen}>
{/*                                     
                                    <Button variant="dark" type="">Create new Event / Match</Button> */}

                                    <button >
                                        <span class="button_top"> Create new Event / Match
                                        </span>
                                    </button >

                                </Nav.Link>
                        </NavLink>
                    </div>

                    <Modal className="AdminBoardgameModal" show={showAdminBoardgameModal} onHide={handleAdminBoardgameModalClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title className="CreateRent">Create new Boardgame</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <AdminBoardgameForm fireFinalActions={fireFinalActions} />
                        </Modal.Body>
                    </Modal>

                    <Modal className="AdminEventModal" show={showAdminEventModal} onHide={handleAdminEventModalClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title className="CreateRent"> Create new Event / Match</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <AdminEventForm fireFinalActions={fireFinalActions} />
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            </Container>
            </div>
            )
}

export default AdminPage

//     < button >
//     <span class="button_top"> Create new Event / Match
//     </span>
// </button >