import {Modal, Button} from "react-bootstrap";
import React, {Component} from "react";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			show: false,
		};
	}

	getProduct = async () => {
		const request = await fetch(
			"https://striveazon-backend.herokuapp.com/cart"
		);
		if (request.ok) {
			const response = await request.json();
			this.setState({products: response});
			console.log(response);
		} else {
			console.log(" could not get hte products");
		}
	};
	addToCard = async (id) => {
		const product = {
			product_id: id,
		};

		const request = await fetch(
			"https://striveazon-backend.herokuapp.com/cart/add",
			{
				method: "POST",
				body: JSON.stringify(product),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log(request);
		this.getProduct();
	};

	removeFromCard = async (id) => {
		const product = {
			product_id: id,
		};

		const request = await fetch(
			"https://striveazon-backend.herokuapp.com/cart/remove",
			{
				method: "POST",
				body: JSON.stringify(product),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log(request);
		this.getProduct();
	};
	componentDidMount() {
		this.getProduct();
	}

	render() {
		return (
			<>
				<Button
					variant="success"
					onClick={() => this.setState({show: !this.state.show})}
				>
					Shopping Cart
				</Button>
				<Modal
					size="lg"
					show={this.state.show}
					onHide={() => this.setState({show: false})}
					aria-labelledby="example-modal-sizes-title-lg"
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-lg">
							Large Modal
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.products.map((product) => {
							return (
								<div className="d-flex flex-row justify-content-between">
									<div className="d-flex flex-row">
										<img
											src="https://source.unsplash.com/random"
											width="150"
											height="150"
											alt=""
										/>
										<div className="ms-2">
											<h5>{product.product_id?.name}</h5>
											<h5>{product.product_id?.brand}</h5>
											<h5> £ {product.product_id?.price} Each</h5>
										</div>
									</div>
									<div className="ms-2">
										<Button
											variant="danger"
											onClick={() =>
												this.removeFromCard(product.product_id?._id)
											}
										>
											<h1>-</h1>
										</Button>
										{" " + product.quantity + " "}
										<Button
											variant="success"
											onClick={() => this.addToCard(product.product_id?._id)}
										>
											<h1>+</h1>
										</Button>
									</div>
								</div>
							);
						})}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="danger"
							onClick={() => this.setState({show: !this.state.show})}
						>
							Close
						</Button>
						<Button variant="success">Check Out Cart</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default Cart;
