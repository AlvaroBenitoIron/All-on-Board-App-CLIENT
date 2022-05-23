import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Container, Nav, Modal, Button, Row, Col } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react"
import boardgameService from "../../services/boardgame.service"
import CreateBoardgameForm from "../../components/CreateBoardgameForm/CreateBoardgameForm"
import MyMatchesCard from "../../components/MyMatchesCard/MyMatchesCard"
import matchesService from "../../services/match.service"
import BoardgameProfileCard from "../../components/BoardgameProfileCard/BoardgameProfileCard"
import "./UserProfilePage.css"
import { MessageContext } from './../../context/message.context'
import RentedProfileCard from "../../components/RentedProfileCard/RentedProfileCard"
import Background from '../../img/FONDOPERFIL.png'

const UserProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [myMatches, setMyMatches] = useState()
    const [myGames, setMygames] = useState([])
    const [rentedGames, setRentedGames] = useState([])



    const [showCreateBGModal, setShowCreateBGModal] = useState(false)
    const handleCreateBGModalClose = () => setShowCreateBGModal(false)
    const handleCreateBGModalOpen = () => setShowCreateBGModal(true)

    const { showMessage } = useContext(MessageContext)

    const fireFinalActions = () => {
        getMyGames()
        handleCreateBGModalClose()
        showMessage('COMPLETE', 'NEW BOARDGAME CREATED')
    }

    useEffect(() => {
        if (user) {
            getMymatches()
            getMyGames()
            getRentedGames()
        }
    }, [user])

    const getMymatches = () => {
        matchesService
            .myMatches()
            .then(({ data }) => {
                setMyMatches(data)
            })
            .catch(err => console.log(err))
    }

    const getMyGames = () => {
        boardgameService
            .getOwnBoardgames()
            .then(({ data }) => {
                setMygames(data)
            })
            .catch(err => console.log(err))
    }

    const getRentedGames = () => {
        boardgameService
            .ownRentedGames()
            .then(({ data }) => {
                setRentedGames(data)
            })
            .catch(err => console.log(err))
    }
    console.log(rentedGames);
    return (
        //         <div className='BackgroundHome' style={{
        //             backgroundImage: `url(${Background
        // })`
        //         }}>
        user ?
            <>
                <div className="ProfilePage" >
                    <Container >
                        <Row>
                            <Col>
                                <div className="ProfileDetails">
                                    <div>
                                        <img className="ImgAvatar" src={user.avatar} alt="" />
                                    </div>
                                    <div className="ProfileText" >
                                        <h1 className="ProfileUsername">Bienvenidx <strong  >{user.username}</strong></h1>
                                        <p>Email: <strong> {user.email}</strong></p>
                                        <p>Description: <strong> {user.description}</strong></p>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                        <div className="GamesToRent">
                            <div className="GamesRent">
                                <div>
                                    <h4 className="TitleGamesToRent">MY GAMES TO RENT</h4>
                                </div>
                                <div className="ButtonCreateGB">
                                    <NavLink to='#' >
                                        <Nav.Link className='elm' onClick={handleCreateBGModalOpen}>
                                            
                                            {/* <Button variant="dark" type="submit">Create Boardgame to rent</Button> */}
                                        
                                            <button className="Delete" type="submit" >
                                                <span class="button_top"> Create Boardgame to rent
                                                </span>
                                            </button >
                                        
                                        </Nav.Link>
                                    </NavLink>
                                </div>
                            </div>

                            <div>
                                <BoardgameProfileCard myGames={myGames} />
                            </div>

                        </div>

                        <div className="MyRentedGB">
                            <h4 className="TitleGamesToRent">RENTED GAMES</h4 >
                            <RentedProfileCard rentedGames={rentedGames} />
                        </div>


                        <div className="MyMatches">
                            <h4 className="TitleGamesToRent">MY MATCHES</h4>
                            <MyMatchesCard myMatches={myMatches} />
                        </div>


                    </Container>
                </div>

                <Modal className="ModalCreate" show={showCreateBGModal} onHide={handleCreateBGModalClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title className="CreateRent">Create Boardgame to rent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateBoardgameForm fireFinalActions={fireFinalActions} />
                    </Modal.Body>
                </Modal>
            </>
            :
            <span className="loader"></span>
    )
}

export default UserProfilePage