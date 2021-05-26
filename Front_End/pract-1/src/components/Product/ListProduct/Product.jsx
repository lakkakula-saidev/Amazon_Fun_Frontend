import React, {Component} from "react";
import {Container, Col, Card, Row, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const apiUrl = process.env.REACT_APP_BE_URL;

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: null,
		};
	}
	Products = async () => {
		const request = await fetch(`${apiUrl}products`);
		const response = await request.json();
		this.setState({products: response});
	};

	DeleteProductImage = async () => {
		const product = this.state.products?.find((product) => {
			return product._id === this.props.match.params.id;
		});
		const arr = product?.image.split("/");
		const local = () => "localhost:3001";
		if (arr.some(local)) {
			const image = arr[arr.length - 1];
			await fetch(`${apiUrl}products/file/${image}`, {
				method: "DELETE",
			});
		} else {
			console.log("image was not in the file system");
		}
	};

	DeleteProduct = async () => {
		try {
			if (this.props.match.params.id) {
				await fetch(`${apiUrl}products/${this.props.match.params.id}`, {
					method: "DELETE",
				});
				this.DeleteProductImage();
				this.Products();
			} else {
				console.log("Could not delete the product");
			}
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount() {
		this.Products();
	}
	render() {
		return (
			<Container fluid>
				<Row className="mt-3 mb-5">
					{this.state.products?.map((product) => (
						<Col key={product._id} sm={3} className="m-0 p-0">
							<Card
								className={
									"m-2" +
									`${
										this.props.match.params.id === product._id
											? "border border-2 border-success"
											: ""
									}`
								}
							>
								<Link to={`/product/${product._id}`}>
									<Card.Img
										className={"img-fluid"}
										style={{height: "250px"}}
										variant="top"
										with="100%"
										height="200px"
										src={product.image}
									/>
								</Link>

								<Card.Body>
									<Card.Title>{product.model}</Card.Title>
									<div className="d-flex justify-content-evenly w-100">
										<Link to={`/updateproduct/${product._id}`}>
											<Button variant="outline-warning">Edit</Button>
										</Link>
										<Link to={`/productdetails/${product._id}`}>
											<Button variant="outline-info">More Details</Button>
										</Link>
										<Button
											onClick={this.DeleteProduct}
											variant="outline-danger"
										>
											Delete
										</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		);
	}
}

export default Product;
