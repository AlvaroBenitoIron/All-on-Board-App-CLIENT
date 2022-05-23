import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import boardgameService from '../../services/boardgame.service'
import { Button} from 'react-bootstrap'

function LikeButton() {

    const [likeValue, setLikeValue] = useState([])
    const [dataBoardgame, setDataBoardgame] = useState([])

    const { id } = useParams()

    useEffect(() => {
        likeBoardgame()
        boardgameData()
    }, [likeValue])

    const likeBoardgame = () => {

        boardgameService
            .likeBoardgame(id)
            .then(({ data }) => {
                // setLikeValue
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
            <div className="LikeButton">
               <Button variant="success" onClick={() => setLikeValue(prevLikeVal => ++prevLikeVal)}> {dataBoardgame[0]?.likes} LIKE </Button>
            </div>
        </div>
    );
}

export default LikeButton