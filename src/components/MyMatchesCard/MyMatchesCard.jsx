import './MyMatchesCard.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyMatchesCard = ({ myMatches }) => {

    return (
        <>
            {
                myMatches?.map((elm) => {
                    return <div key={elm._id}>
                        <Link to={`/match/${elm._id}`}>
                            <Card.Body className="DescriptionMyMatches">
                                <p className="TitleMyMatches" ><strong>{elm.description}</strong></p>
                                <p>{elm.startTime.slice(0, 10)}</p>
                            </Card.Body>
                        </Link>
                    </div>
                })
            }
        </>
    )
}

export default MyMatchesCard