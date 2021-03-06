import React, { Component } from "react";
import { Container, Col, Card, Row, Form, Button } from "react-bootstrap";

const apiUrl = process.env.REACT_APP_BE_URL;

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.location.state.item.product,
            comments: this.props.location.state.item.product.reviews,
            leaveComment: {
                rate: "",
                comment: "",
                product_id: this.props.match.params.id
            },
            comment_id: ""
        };
    }

    Reviews = async () => {
        const request = await fetch(apiUrl + `/product/${this.props.match.params.id}/reviews`);
        if (request.ok) {
            const response = await request.json();
            this.setState({ comments: response });
        }
    };

    DeleteReview = async () => {
        const request = await fetch(apiUrl + `/product/reviews/${this.state.comment_id}`, {
            method: "DELETE"
        });
        if (request.ok) {
            alert("Comment Deleted");
            this.Reviews();
        } else {
            console.log("Failed to delete the comment");
        }
    };

    PostReview = async (event) => {
        event.preventDefault();

        const request = await fetch(apiUrl + `/product/reviews`, {
            method: "POST",
            body: JSON.stringify(this.state.leaveComment),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (request.ok) {
            alert("Comment Posted Successfully");
        }
        this.Reviews();
        this.setState({
            leaveComment: {
                rate: "",
                comment: "",
                product_id: this.props.match.params.id
            }
        });
    };

    handleInputChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        this.setState({
            leaveComment: {
                ...this.state.leaveComment,
                [id]: value
            }
        });
    };

    render() {
        console.log(this.state.comments);
        return (
            <Container>
                <Row className="mt-3 mb-5">
                    <Col key={this.state.product._id} sm={4} className="m-0 p-0">
                        <Card className="m-2">
                            <Card.Img className={"img-fluid"} style={{ height: "250px" }} variant="top" with="100%" height="200px" src={this.state.product.image} />

                            <Card.Body className="text-start">
                                <Card.Text>
                                    <strong>Model:</strong> {this.state.product.name}{" "}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Brand:</strong> {this.state.product.brand}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Description:</strong> {this.state.product.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Row>
                            {this.state.comments &&
                                this.state.comments.map((comment) => {
                                    return (
                                        <Col sm={12}>
                                            <Row className="text-start">
                                                <Col sm={12}>
                                                    <strong>Comment: </strong> {comment.comment}
                                                </Col>
                                                <Col sm={12}>
                                                    <strong>Rate: </strong>
                                                    <input type="range" min="1" max="5" value={comment.rate} />
                                                    <Button
                                                        onMouseEnter={() => {
                                                            this.setState({ comment_id: comment._id });
                                                        }}
                                                        value={comment._id}
                                                        id="commentId"
                                                        className="w-100 my-2"
                                                        type="button"
                                                        variant="outline-danger"
                                                        onClick={this.DeleteReview}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    );
                                })}
                            {this.state.comments.length == 0 && "No Comments Yet"}
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Form onSubmit={this.PostReview} className="p-3 text-start border border-2 border-info">
                            <Form.Group controlId="rate">
                                <Form.Label>Rate from 1 to 5</Form.Label>
                                <Form.Control value={this.state.leaveComment.rate} onChange={this.handleInputChange} as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="comment">
                                <Form.Label>Leave your comment</Form.Label>
                                <Form.Control value={this.state.leaveComment.comment} onChange={this.handleInputChange} as="textarea" rows={3} />
                            </Form.Group>
                            <Button className="w-100 mt-2" type="submit" variant="outline-info">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProductDetails;
