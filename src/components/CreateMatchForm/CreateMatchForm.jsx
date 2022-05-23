import { useState, useEffect } from "react"
import { Form, Modal, Button, Container, Col, Row } from "react-bootstrap"
import boardgameService from "../../services/boardgame.service"
import matchesService from "../../services/match.service"

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const CreateMatchForm = ({ fireFinalActions }) => {

    const [createMatchData, setCreateMatchData] = useState({
        description: '',
        startTime: '',
        boardGame: undefined,
        lat: undefined,
        lng: undefined,
        kind: "MATCH"
    })

    const [value, setValue] = useState(null);
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    const [boardgamesData, setBoardgamesData] = useState([])

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
            setCreateMatchData({
                ...createMatchData,
                lat: response.lat,
                lng: response.lng
            })
        });


    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCreateMatchData({
            ...createMatchData,
            [name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        matchesService
            .createMatch(createMatchData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    const { description, startTime, boardGame, location } = createMatchData
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
                    {/* <Col>
                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="location" value={location} />
                        </Form.Group>
                    </Col> */}
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
                <Button variant="dark" className="form-button" type="submit" >Create match</Button>
            </Modal.Footer>
        </Form>
    )
}

export default CreateMatchForm
