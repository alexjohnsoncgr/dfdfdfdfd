import { Card, CardBody, CardText, CardTitle } from "reactstrap"


const LoadComment = ({ comment }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">{comment.userId.name}</CardTitle>
                <CardText>{comment.comment}</CardText>
            </CardBody>
        </Card>
    )
}

export default LoadComment;