import axios from 'axios'

class BoardGameService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/boardgames` })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllBoardgames = () => {
        return this.app.get('/')
    }

    createBoardgame = boardgame => {
        return this.app.post(`/create`, boardgame)
    }

    getBoardgame = id => {
        return this.app.get(`/${id}`)
    }

    getRentBoardgames = id => {
        return this.app.get(`/${id}/rent`)
    }

    editBoardgame = (id, boardgameInfo) => {
        return this.app.put(`/${id}/edit`, boardgameInfo)
    }

    deleteBoardgame = id => {
        return this.app.delete(`/${id}/delete`)
    }

    likeBoardgame = id => {
        return this.app.put(`/${id}/like`)
    }

    dislikeBoardgame = id => {
        return this.app.put(`/${id}/dislike`)
    }

    addFavBoardgame = id => {
        return this.app.put(`/${id}/favourite`)
    }

    deleteFavBoardgame = id => {
        return this.app.put(`/${id}/delete-favourite`)
    }

    getBoardgameByName = input => {
        return this.app.get(`/search-boardgame-by-name/${input}`)
    }

    getOwnBoardgames = () => {
        return this.app.get('/owngames')
    }

    getOriginalBoardgames = () => {
        return this.app.get('/originals')
    }

    ownRentedGames = () => {
        return this.app.get('/rentedGames')
    }

}

const boardgameService = new BoardGameService()

export default boardgameService