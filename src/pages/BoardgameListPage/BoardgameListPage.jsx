import { useState, useEffect } from "react"
import boardgameService from "../../services/boardgame.service.js"
import { Container } from "react-bootstrap";
import BoardgamesList from "../../components/BoardgamesList/BoardgamesList.jsx";
import SearchBar from "../../components/SearchBar/SearchBar"
import './BoardgameListPage.css'

const BoardgamesListPage = () => {

    const [allBoardgames, setAllBoardgames] = useState([])

    useEffect(() => {
        boardgameService
            .getOriginalBoardgames()
            .then(({ data }) => {
                setAllBoardgames(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className="BoardgameListContainer">
                <Container className="BoardgameListContainer">
                    <div>
                        <h1 className="BoardgamesListTitle">Boardgames List</h1>
                    </div>

                    <div className="SearchBar">
                        <h6 className="SearchGames" >SEARCH GAMES</h6>
                        <hr className="hrList"></hr>
                        <SearchBar />
                    </div>

                    <div clasName="BoardgamesList">
                        <BoardgamesList boardgames={allBoardgames[0]} />
                    </div>
                </Container>
            </div>
        </>
    )
}

export default BoardgamesListPage