import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates'
import bookingsService from "../../services/booking.service"
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import './BookingForm.css'

const moment = extendMoment(Moment);

const BookingForm = ({ fireFinalActions }) => {


    const { id } = useParams()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const [focusedInput, setFocusedInput] = useState()

    const [bookings, setBookings] = useState()

    const [bookingState, setBookingState] = useState({
        startDate: '',
        endDate: ''
    })

    const navigate = useNavigate()

    const handleInputChange = (startDate, endDate) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    useEffect(() => {
        bookingsService
            .getOneBooking(id)
            .then(({ data }) => {
                console.log(data)
                setBookings(data)

            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setBookingState({
            ...bookingState,
            startDate: startDate?._d,
            endDate: endDate?._d
        })
    }, [startDate, endDate])

    function handleSubmit(e) {
        e.preventDefault()

        bookingsService
            .createBooking(id, bookingState)
            .then(() => {
                fireFinalActions()
                navigate(`/profile`)
            })
            .catch(err => console.log(err))
    }

    const isBlocked = (date) => {

        let bookedDays = []
        let blocked

        bookings?.map(eachBooking => {
            bookedDays = [...bookedDays,
            moment.range(eachBooking.startDate, eachBooking.endDate)]
        })

        blocked = bookedDays.find(range => range.contains(date))

        return blocked
    }

    return (
        <article>
            {
                <>
                    {/* <div className="BookingText" >
                        <h7 className="SubBooking"> Select days to rent the boardgame. </h7>
                    </div> */}
                    <div>
                        {
                            <DateRangePicker className="Calendar"

                                startDate={startDate}
                                startDateId="your_unique_start_date_id"
                                endDate={endDate}
                                endDateId="your_unique_end_date_id"
                                onDatesChange={({ startDate, endDate }) => handleInputChange(startDate, endDate)}

                                focusedInput={focusedInput}
                                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                isDayBlocked={isBlocked}
                            />

                        }
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Button className="BtnBooking" variant="dark" type="submit" >Send Booking</Button>
                    </Form>
                </>
            }

        </article>
    )
}

export default BookingForm