import axios from "axios"

class CommentService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comment`
        })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getCommentsBoardgame = (id) => {
        return this.app.get(`/${id}`)
    }

    createComment = (id, comment) => {
        return this.app.post(`/${id}/create`, comment)
    }

    deleteComment = id => {
        return this.app.delete(`/${id}/delete`, id)
    }

}

const commentService = new CommentService()

export default commentService