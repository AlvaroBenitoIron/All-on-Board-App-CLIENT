import { Routes, Route } from "react-router-dom"
import BoardgamesDetailsPage from "../pages/BoardgameDetailsPage/BoardgameDetailsPage"
import BoardgamesListPage from "../pages/BoardgameListPage/BoardgameListPage"
import MatchesListPage from '../pages/MatchListPage/MatchListPage'
import IndexPage from "../pages/HomePage/HomePage"
import MatchDetailsPage from "../pages/MatchDetailsPage/MatchDetailsPage"
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage"
import CreateBoardGamePage from "../pages/CreateBoardGamePage/CreateBoardGamePage"
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage"
import BoardgameRentPage from "../pages/BoardgameRent/BoardgameRentPage"
import AdminPage from "../pages/AdminPage/AdminPage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/edit" element={<EditProfilePage />} />
            <Route path="/boardgames" element={<BoardgamesListPage />} />
            <Route path="/boardgames/:id" element={<BoardgamesDetailsPage />} />
            <Route path="/boardgames/:id/booking" element={<BoardgameRentPage />} />
            <Route path="/boardgames/:id/like" element={<BoardgamesDetailsPage />} />
            <Route path="/boardgames/:id/dislike" element={<BoardgamesDetailsPage />} />
            <Route path="/boardgames/create" element={<CreateBoardGamePage />} />
            <Route path='/match' element={<MatchesListPage />} />
            <Route path='/match/:id' element={<MatchDetailsPage />} />
            <Route path="/match/:id/join" element={<UserProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<h1>Esto es un 404 jeje</h1>} />
        </Routes>
    )
}

export default AppRoutes