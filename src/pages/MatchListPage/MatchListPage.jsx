import { useEffect, useState } from "react"
import { Container, Nav, Modal, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import matchesService from './../../services/match.service'
import MatchesList from "../../components/MatchesList/MatchesList"
import CreateMatchForm from "../../components/CreateMatchForm/CreateMatchForm"
import './MatchListPage.css'

const MatchListPage = () => {

    const [matches, setMatches] = useState([])

    const [showCreateMatchModal, setShowCreateMatchModal] = useState(false)
    const handleCreateMatchModalClose = () => setShowCreateMatchModal(false)
    const handleCreateMatchModalOpen = () => setShowCreateMatchModal(true)

    useEffect(() => {
        matchesService
            .getAllMatches()
            .then(({ data }) => {
                setMatches(data)

            })
            .catch(err => console.log(err))
    }, [])

    const loadMatches = () => {
        matchesService
            .getAllMatches()
            .then(({ data }) => setMatches(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        loadMatches()
        handleCreateMatchModalClose()
    }


    return (
        <>
            <Container className="MatchesListContainer">
                <div>
                    <h1 className="MatchesListTitle">Matches list</h1>
                </div>

                <div className="CreateMatch">
                    <div>
                        <h6 className="CreateMatchTitle">START PLAYING WITH YOUR FRIENDS</h6>
                    </div>

                    <div>
                        <NavLink to='#' >
                            <Nav.Link className='elm' as="span" onClick={handleCreateMatchModalOpen}>
                                
                                {/* <Button variant="dark" type="">Create new match</Button> */}
                            
                                <button >
                                    <span class="button_top"> Create new match
                                    </span>
                                </button >
                            
                            </Nav.Link>
                        </NavLink>
                    </div>

                    <Modal className="ModalMatch" show={showCreateMatchModal} onHide={handleCreateMatchModalClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title className="CreateRent">Create new match</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <CreateMatchForm fireFinalActions={fireFinalActions} />
                        </Modal.Body>
                    </Modal>
                </div>

                <div>
                    <MatchesList matches={matches} />
                    <hr className="hrCreateMatch" />
                </div>

            </Container>
        </>
    )

}
export default MatchListPage
