import './RentCard.css'
import { Card, Nav, Modal } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import BookingForm from '../BookingForm/BookingForm'

const RentCard = ({ boardgameDetails }) => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const [showBookingModal, setShowBookingModal] = useState(false)
    const BookingModalClose = () => setShowBookingModal(false)
    const BookingModalOpen = () => setShowBookingModal(true)

    const fireFinalActions = () => {
        BookingModalClose()
    }

    return (
        <>
            {
                boardgameDetails?.map((elm) => {

                    return <div key={elm._id}>
                        <Card className='rentCard'>
                            <Nav.Link className='elm' to={`/boardgames/${elm._id}/booking`} onClick={BookingModalOpen}>

                                <div className='myContainerRent'>
                                    <div>
                                        <img className='overlayImg' src={elm.gameImg}>
                                        </img>
                                    </div>
                                    <div className='DetailsOwner'>
                                        <p className='NameOwner'> Owner: {elm?.owner?.username} </p>
                                        <p className='Dategame'> Created: {elm.updatedAt.slice(0, 10)} </p>
                                    </div>
                                </div>
                                <Card.Body>
                                    <Card.Title>{elm.age}</Card.Title>
                                </Card.Body>
                            </Nav.Link>
                        </Card>

                    </div>
                })
            }


            <Modal Modal className="ModalBooking" show={showBookingModal} onHide={BookingModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="Booking">MAKE YOUR BOOKING</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookingForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RentCard