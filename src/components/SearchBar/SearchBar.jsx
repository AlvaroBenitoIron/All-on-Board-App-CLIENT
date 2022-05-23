import { useState } from 'react'
import { Link } from 'react-router-dom'
import boardgameService from '../../services/boardgame.service'
import './SearchBar.css'

const SearchBar = () => {

    const [search, setSearch] = useState([])

    const handleSearch = e => {

        if (e.target.value === '') {
            setSearch([])
        } else {
            boardgameService
                .getBoardgameByName(e.target.value)
                .then(({ data }) => {
                    setSearch(data)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        < div className="group" >
            <div className='searchbox'>

                <div className='searchbar'>
                    <input placeholder="Search" type="search" className=" input inputBoardGame" onChange={handleSearch} />
                </div>
                <div>
                    {
                        search.length !== 0 && (
                            <div className='Dropdown'>
                                {
                                    search.map(game => {
                                        return (
                                            <div className='Search'>
                                                <Link key={game?.id} to={`/boardgames/${game._id}`}>
                                                    <p className='search'>
                                                        <img className='ImgSearch' src={game.gameImg} alt={game.name} />{game.name}</p>
                                                    <hr />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>)
                    }
                </div>
            </div >
        </div>
    )
}

export default SearchBar
