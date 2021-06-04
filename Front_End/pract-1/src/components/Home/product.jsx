import { Card } from "react-bootstrap";
import React from "react";

class Product extends React.Component {
    state = {
        selected: false,
        comments: []
    };

    render() {
        const product = this.props.product;
        return (
            <>
                <Card className="h-100 my-4 " style={{ width: "18rem" }} key={product._id} id={product._id}>
                    <Card.Img className="cardImages" variant="top" src={product.imageUrl} />
                    <Card.Body>
                        <Card.Title className="titleWrap">{product.name}</Card.Title>
                        <Card.Text>Price: {product.price}</Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
export default Product;
