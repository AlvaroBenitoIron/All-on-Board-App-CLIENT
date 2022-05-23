import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`
        })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    signup = user => {
        return this.app.post('/signup', user)
    }

    login = user => {
        return this.app.post('/login', user)
    }

    verify = token => {
        return this.app.get('/verify')
    }

}

const authService = new AuthService()

export default authService