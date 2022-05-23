import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap'
import boardgameService from '../../services/boardgame.service'
import RentCard from '../../components/RentCard/RentCard'
import LikeButton from '../../components/LikeButton/LikeButton'
import DislikeButton from '../../components/DislikeButton/DislikeButton'
import CommentCard from '../../components/CommentCard/CommentCard'
import commentService from '../../services/comment.service'
import "./BoardgameDetailsPage.css"


const BoardgamesDetailsPage = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const [boardgameDetails, setBoardgameDetails] = useState([])

    const { id } = useParams()

    const [createCommentData, setCreateCommentData] = useState({
        content: '',
    })

    const [commentsData, setCommentsData] = useState([])



    useEffect(() => {
        getDetails()
        loadComments()
    }, [])



    const getDetails = () => {

        boardgameService
            .getBoardgame(id)
            .then(({ data }) => {
                setBoardgameDetails(data)
            })
            .catch(err => console.log(err))
    }

    const deleteBoardgame = (id) => {

        boardgameService
            .deleteBoardgame(id)
            .then(() => {

            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCreateCommentData({
            ...createCommentData,
            [name]: value,
        })
    }

    const { content } = createCommentData

    const handleSubmit = e => {

        e.preventDefault()

        commentService
            .createComment(id, createCommentData)
            .then(() => {
                loadComments()
                setCreateCommentData({ content: "" })
            })
            .catch(err => console.log(err))


    }

    const loadComments = () => {
        commentService
            .getCommentsBoardgame(id)
            .then(({ data }) => {
                setCommentsData(data)
            })
            .catch(err => console.log(err))


    }

    const fireFinalActions = () => {
        loadComments()
    }

    //LIKE BOARDGAME
    const [isLike, setIsLike] = useState()
    const [btnState, setBtnState] = useState('LIKE')

    const handleLikeBtn = () => {

        boardgameService
            .isLike
            .then(() => {
                setIsLike(true)
                setBtnState('LIKE')
            })
    }

    //DISLIKE BOARDGAME
    const [isDisLike, setIsDisLike] = useState()
    const [disBtnState, setDisBtnState] = useState('DISLIKE')

    const handleDislikeBtn = () => {

        boardgameService
            .isDisLike
            .then(() => {
                setIsDisLike(true)
                setDisBtnState('LIKE')
            })
    }

    console.log("RENT", boardgameDetails[1])

    return (
        <div className="GBDetailsPage" >
            <Container>
                <div className="gameDetails">
                    <h1 className="gameDetailsName">{boardgameDetails[0]?.name}</h1>
                    <hr className="hrDetails"></hr>
                    <Row>
                        <Col className="gameDetailsDetails" md={{ span: 6 }}>
                            <h4>DESCRIPTION</h4>
                            <p>{boardgameDetails[0]?.description}</p>
                            <h4>DETAILS</h4>
                            <p>DURATION: {boardgameDetails[0]?.playingTime}</p>
                            <p>PLAYERS: {boardgameDetails[0]?.players?.min}-{boardgameDetails[0]?.players?.max} </p>
                            <p>AGE: {boardgameDetails[0]?.age}</p>
                        </Col>
                        <Col md={{ span: 5 }}>
                            <img className="imageDetails" style={{ width: '100%' }} src={boardgameDetails[0]?.gameImg} alt={boardgameDetails[0]?.name} />
                        </Col>

                        {
                            !isLoggedIn ?
                                <>

                                    <Link to="/boardgames">


                                        {/* <Button className="btnReturn" variant="dark">Back to Boardgames List</Button> */}
                                        <button >
                                            <span class="button_top"> Back to Boardgames List
                                            </span>
                                        </button >

                                    </Link>
                                </>
                                :
                                <>
                                    <Row>
                                        <Col md={{ span: 6 }} className="ButtonsDetails" >
                                            <Link to={`/boardgames/${id}`}>
                                                <div className="btnLikeDislike" >
                                                    <div className="btnLike">
                                                        <LikeButton btnState={btnState} handleLikeBtn={handleLikeBtn} />
                                                    </div>
                                                    <div className="btnDislike">
                                                        <DislikeButton btnState={btnState} handleDislikeBtn={handleDislikeBtn} />
                                                    </div>

                                                </div>
                                            </Link>
                                        </Col>
                                        <Col md={{ span: 5 }} className="ButtonsBack" >
                                            {user.role === 'ADMIN' &&
                                                <div className="btnDelete">
                                                    <Link to={'/boardgames'}>

                                                        {/* <Button className="btnReturn" variant="danger" onClick={() => deleteBoardgame(id)}>Delete Game</Button> */}

                                                        <button className="Delete"  >
                                                            <span class="button_top" onClick={() => deleteBoardgame(id)}> Delete Game
                                                            </span>
                                                        </button >

                                                    </Link>
                                                </div>
                                            }
                                            <div className="btnDetails">
                                                <Link to={'/boardgames'}>
                                                    <button  >
                                                        <span class="button_top"> Back to Boardgames List
                                                        </span>
                                                    </button >
                                                </Link>
                                            </div>


                                        </Col>
                                    </Row>
                                </>
                        }
                    </Row>
                </div>

                <div className="rentGames" >
                    <Row>
                        <h6 className='ToRentTitle'> TO RENT </h6>
                        <RentCard boardgameDetails={boardgameDetails[1]} />
                    </Row>
                </div>


                <div className="Comments">
                    {
                        !isLoggedIn ?
                            <>
                                <CommentCard fireFinalActions={fireFinalActions} commentsData={commentsData} />

                            </>
                            :
                            <>
                                <CommentCard fireFinalActions={fireFinalActions} commentsData={commentsData} />

                                <div clasName="CreateComment">
                                    <h6 className="CommentTitle CommentTitleForm">LEAVE YOUR COMMENT</h6>
                                    <Form onSubmit={handleSubmit}>
                                        <FloatingLabel className='CommentsArea' controlId="floatingTextarea2" label="Comments">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Leave a comment here"
                                                style={{ height: '100px' }}
                                                name="content"
                                                value={content}
                                                onChange={handleInputChange}
                                            />
                                        </FloatingLabel>

                                        {/* <Button variant="dark" className="form-button Comment-btn" type="submit" >Comment</Button> */}

                                        <button >
                                            <span class="button_top" type="submit"> Comment
                                            </span>
                                        </button >

                                    </Form>
                                </div>
                            </>
                    }
                </div>
            </Container >
        </div >
    )
}


export default BoardgamesDetailsPage