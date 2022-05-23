import { Row, Col } from "react-bootstrap"
import MatchCard from '../MatchCard/MatchCard'
import './MatchesList.css'

const MatchesList = ({ matches }) => {

    return (
        <div className="MatchesList" >
            <Row>
                {
                    matches.map(match => {
                        return (
                            <Col md={{ span: 4 }} key={match._id}>
                                <MatchCard {...match} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default MatchesList