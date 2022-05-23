import { Col, Container, Row, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./CommentCard.css"

function CommentCard({ commentsData }) {


    const { id } = useParams()

    return (
        <>
            <Container>
                <div>
                    <h6 className="CommentTitle" >COMMENTS</h6>
                </div>
                <Row>
                    {commentsData?.map((eachComment) => {
                        return (
                            <Col lg={6}>
                                <Card className="commentCard" key={eachComment.id}>
                                    <Card.Body>
                                        <div className="commentTop" >
                                            <h6 className="commentOwner">
                                                {eachComment?.owner?.username}:
                                            </h6>

                                            <p className="commentDate">
                                                {eachComment.createdAt.slice(0, 10)}
                                            </p>
                                        </div>

                                        <div>
                                            <hr className="hrComments"></hr>

                                            <p className="commentContent">
                                                "<i>{eachComment.content}</i>"
                                            </p>
                                        </div>

                                    </Card.Body>
                                </Card>

                            </Col>
                        );
                    })}

                </Row>
            </Container>
        </>
    );
}

export default CommentCard