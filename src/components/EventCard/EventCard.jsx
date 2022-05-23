import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './EventCard.css'

const EventCard = ({ events }) => {

console.log(events)
    return (

        <>
            <div className="MatchesCards"  >
                <Link to={`/match/${events?.id}`} className="MatchesLink" >

                    <Card className="MatchCardList MatchCard" >
                        <Card.Title className="text-title-matchesList text-title ">{events?.boardgame?.name}</Card.Title>
                        <Card.Body className="MatchesBodyText">
                            <h4 className="Eventtitle">{events?.boardGame?.name}</h4>
                            <p>{events?.description}</p>
                            <p> {events?.startTime?.slice(0, 10)}</p>
                            <p>{events?.players?.length}</p>
                        </Card.Body>
                        <div className="d-grid gap-2 icono">
                            <div className="card-icon">
                                <svg viewBox="0 0 28 25">
                                    <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
                                </svg>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </>

    )
}
export default EventCard