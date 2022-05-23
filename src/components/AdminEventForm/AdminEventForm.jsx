import { useState, useEffect } from "react"
import { Form, Modal, Button, Container, Col, Row } from "react-bootstrap"
import boardgameService from "../../services/boardgame.service"
import matchesService from "../../services/match.service"

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const AdminEventForm = ({ fireFinalActions }) => {

    const [adminEventData, setADminEventData] = useState({
        description: '',
        startTime: '',
        boardGame: undefined,
        lat: undefined,
        lng: undefined,
        kind: undefined
    })

    const [boardgamesData, setBoardgamesData] = useState([])

    const [value, setValue] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        boardgameService
            .getOriginalBoardgames()
            .then(({ data }) => {
                setBoardgamesData(data)
                setIsLoaded(true)
            })
    }, [])

    isLoaded && geocodeByAddress(value?.value.description)
        .then(results => {
            return getLatLng(results[0])
        })
        .then((response) => {
            console.log('Successfully got latitude and longitude', response)
            setADminEventData({
                ...adminEventData,
                lat: response.lat,
                lng: response.lng
            })
        });

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setADminEventData({
            ...adminEventData,
            [name]: value,
            // kind: kind
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        matchesService
            .createMatch(adminEventData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    const { description, startTime, boardGame, location, kind } = adminEventData
    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>

    return (

        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Form.Group className="mb-3" controlId="boardGame">
                        <Form.Label>Boardgame{tab}
                            <select name="boardGame" value={boardGame} onChange={handleInputChange}>
                                {
                                    boardgamesData[0]?.map(game => {
                                        return (
                                            <option value={game?._id}>{game?.name}</option>
                                        )

                                    })
                                }
                            </select>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
                    </Form.Group>
                    <Col>
                        <Form.Group className="mb-3" controlId="startTime">
                            <Form.Label>Start time</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="startTime" value={startTime} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="location" value={location} />
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" controlId="kind">
                        <Form.Label>Kind{tab}
                            <select name="kind" value={kind} onChange={handleInputChange}>
                                <option value='MATCH'>MATCH</option>
                                <option value='EVENT'>EVENT</option>
                            </select>
                        </Form.Label>
                    </Form.Group>

                    {/* <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTfrEJjFOyJQ3p3WbSYP0yNoasqELJNFY&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    /> */}
                    <div>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyBTfrEJjFOyJQ3p3WbSYP0yNoasqELJNFY"
                            selectProps={{ value, onChange: setValue }}
                        />
                    </div>

                </Row>
            </Container>

            <Modal.Footer>
                <Button variant="dark" className="form-button" type="submit" >Create match / event</Button>
            </Modal.Footer>
        </Form>
    )
}

export default AdminEventForm
