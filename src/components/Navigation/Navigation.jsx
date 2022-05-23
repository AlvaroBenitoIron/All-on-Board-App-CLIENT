import './Navigation.css'
import { Navbar, Container, Nav, Modal} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'
import DiceImg from '../../img/dice.png'

const Navigation = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const [showLoginModal, setShowLoginModal] = useState(false)
    const LoginModalClose = () => setShowLoginModal(false)
    const LoginModalOpen = () => setShowLoginModal(true)

    const [showSignupModal, setShowSignupModal] = useState(false)
    const SignupModalClose = () => setShowSignupModal(false)
    const SignupModalOpen = () => setShowSignupModal(true)

    const fireFinalActions = () => {
        LoginModalClose()
        SignupModalClose()
    }

    return (
        <>
            < Navbar className="Navbar" >
                <Container className="Navbar2">
                    <Nav>
                        <NavLink to="/" >
                            <img
                                src={DiceImg}
                                width="70"
                                height="70"
                                className="d-inline-block align-top"
                            />
                        </NavLink>
                        {
                            !isLoggedIn ?
                                <>
                                    <div className="NavBarText">
                                        <NavLink to="/boardgames" className="nav-link">BOARDGAMES</NavLink>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="NavBarText">
                                        <NavLink to="/boardgames" className="nav-link">BOARDGAMES</NavLink>
                                    </div>

                                    <div className="NavBarText">
                                        <NavLink to="/match" className="nav-link">MATCHES</NavLink>
                                        {/* {user.role === 'ADMIN' &&
                                            <NavLink to="/admin" className="nav-link">ADMIN VIEW</NavLink>} */}
                                    </div>
                                    <div className="NavBarText">
                                        {user.role === 'ADMIN' &&
                                            <NavLink to="/admin" className="nav-link">ADMIN VIEW</NavLink>}
                                    </div>
                                </>
                        }
                    </Nav>
                    <Nav className="Register">
                        {
                            !isLoggedIn ?
                                <>
                                    <NavLink to='#' className="NavBarText">
                                        <Nav.Link className='elm' as="span" onClick={SignupModalOpen}>SIGNUP</Nav.Link>
                                    </NavLink>

                                    <NavLink to='#' className="NavBarText">
                                        <Nav.Link className='elm' as="span" onClick={LoginModalOpen}>LOGIN</Nav.Link>
                                    </NavLink>
                                </>
                                :
                                <>
                                    <NavLink to={`/profile`} className="NavBarText">
                                        <Nav.Link as="span">PROFILE</Nav.Link>
                                    </NavLink>
                                    <NavLink to={`/`} className="NavBarText">
                                        <div className="nav-link" onClick={logOutUser}>LOGOUT</div>
                                    </NavLink>
                                </>
                        }
                    </Nav>
                </Container>
            </Navbar >

            <Modal className="ModalSignup" show={showSignupModal} onHide={SignupModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="Signup">SIGNUP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

            <Modal className="ModalLogin" show={showLoginModal} onHide={LoginModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="Login">LOGIN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Navigation