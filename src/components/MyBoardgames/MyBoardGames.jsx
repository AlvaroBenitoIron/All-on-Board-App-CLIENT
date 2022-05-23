import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"

const MyBoardgames = () => {

    const { user } = useContext(AuthContext)

    const [myBoardgames, setMyBoardgames] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (user) {
            getMyBoardgames()
        }
    }, [user])

    const getMyBoardgames = () => {
        userService
            .then(({ data }) => {
                setMyBoardgames(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                isLoaded && myBoardgames.map(eachBoardgame => {
                    return <p key={eachBoardgame._id}>
                        {eachBoardgame.name}{eachBoardgame.gameImg}</p>
                })
            }
            <hr />
        </>
    )
}

export default MyBoardgames