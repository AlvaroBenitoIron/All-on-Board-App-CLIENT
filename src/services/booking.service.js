import axios from 'axios'

class BookingsService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/bookings` })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllBookings = () => {
        return this.app.get('/')
    }

    createBooking = (id, booking) => {
        return this.app.post(`/${id}/create`, booking)
    }

    getOneBooking = id => {
        return this.app.get(`/${id}`)
    }

    editBooking = (id, bookingInfo) => {
        return this.app.put(`/${id}/edit`, bookingInfo)
    }

    deleteBooking = id => {
        return this.app.delete(`/${id}/delete`)
    }

}

const bookingsService = new BookingsService()

export default bookingsService