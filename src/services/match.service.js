import axios from 'axios'

class MatchesService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/match` })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getAllMatches = () => {
        return this.app.get('/')
    }

    createMatch = match => {
        return this.app.post(`/create`, match)
    }

    getOneMatch = id => {
        return this.app.get(`/${id}`)
    }

    editMatch = (id, matchInfo) => {
        return this.app.put(`/${id}/edit`, matchInfo)
    }

    deleteMatch = id => {
        return this.app.delete(`/${id}/delete`)
    }

    joinMatch = id => {
        return this.app.put(`/${id}/join`)
    }

    unjoinMatch = (id, match) => {
        return this.app.post(`/${id}/unjoin`, match)
    }

    myMatches = () => {
        return this.app.get(`/mymatches`)
    }

    allEvents = () => {
return this.app.get('/events')
    }
}

const matchesService = new MatchesService()

export default matchesService