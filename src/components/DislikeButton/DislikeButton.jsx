import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import boardgameService from '../../services/boardgame.service'
import {Button } from 'react-bootstrap'

function DislikeButton() {

    const [dislikeValue, setDislikeValue] = useState([])
    const [dataBoardgame, setDataBoardgame] = useState([])

    const { id } = useParams()

    useEffect(() => {
        likeBoardgame()
        boardgameData()
    }, [dislikeValue])

    const likeBoardgame = () => {

        boardgameService
            .dislikeBoardgame(id)
            .then(({ data }) => {
                // setDislikeValue
            })
            .catch(err => console.log(err))
    }

    const boardgameData = () => {

        boardgameService
            .getBoardgame(id)
            .then(({ data }) => {
                setDataBoardgame(data)
            })
    }

    return (
        <div>
            <div className="DislikeButton">
                <Button variant="danger" onClick={() => setDislikeValue(prevLikeVal => ++prevLikeVal)}> {dataBoardgame[0]?.dislike} DISLIKE </Button>
            </div>
        </div>
    );
}

export default DislikeButton;