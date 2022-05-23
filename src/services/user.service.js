import axios from 'axios'

class UserService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUsers = () => {
        return this.app.get(`/`)
    }

    getUserProfile = id => {
        return this.app.get(`/${id}`)
    }

    // getAllBoardGamesOneUser = () => {
    //     return this.app.get(`/${id}`)
    // }

    editUser = (id, userInfo) => {
        return this.app.put(`/${id}/edit`, userInfo)
    }

    deleteUser = id => {
        return this.app.delete(`/${id}/delete`)
    }

}

const userService = new UserService()

export default userService