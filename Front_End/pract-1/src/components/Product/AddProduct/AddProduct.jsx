import React, {Component} from "react";
import {Container, Col, Form, Row, Button} from "react-bootstrap";

class AddProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {},
		};
	}

	GetProduct = async () => {
		try {
			const request = await fetch(
				`http://localhost:3001/products/${this.props.match.params.id}`
			);
			const response = await request.json();
			this.setState({
				product: response,
			});
		} catch (error) {
			console.log(error);
		}
	};

	AddProduct = async () => {
		try {
			await fetch("http://localhost:3001/products/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.state.product),
			});
		} catch (error) {
			console.log(error);
		}
	};

	UpdateProduct = async () => {
		try {
			await fetch(
				`http://localhost:3001/products/${this.props.match.params.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(this.state.product),
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	AddFile = async () => {
		try {
			await fetch("http://localhost:3001/products/file", {
				method: "POST",
				body: this.state.image,
			});
		} catch (error) {
			console.log(error);
		}
	};

	HandleProduct = (event) => {
		event.preventDefault();

		const file = document.getElementById("image").files.length;
		if (file > 0) {
			this.AddFile();
			if (this.props.match.params.id) {
				this.UpdateProduct();
				this.setState({
					product: {},
				});
			} else {
				this.AddProduct();
				this.setState({
					product: {},
				});
			}
		} else {
			if (this.props.match.params.id) {
				this.UpdateProduct();
			} else {
				this.AddProduct();
			}
		}
		// window.location = "/product";
	};

	HandleSetting = () => {
		if (this.props.match.params.id) {
			this.GetProduct();
		}
	};
	componentDidMount() {
		this.HandleSetting();
	}

	handleInputChange = (event) => {
		const id = event.target.id;
		const value = event.target.value;

		this.setState({
			product: {
				...this.state.product,
				[id]: value,
			},
		});
	};

	handleInputImage = (event) => {
		event.preventDefault();
		const urlLink = "http://localhost:3001/";
		const id = event.target.id;
		const file = event.target.files[0];
		let form = new FormData();
		form.append("image", file);

		this.setState({
			product: {
				...this.state.product,
				[id]: urlLink + file.name,
			},
			[id]: form,
		});
	};

	render() {
		return (
			<Container>
				<Row className="mt-3 mb-5">
					<Col sm={10} md={7} className="m-auto border border-success p-5">
						<Form onSubmit={this.HandleProduct}>
							<Form.Group
								controlId="productName"
								className="d-flex justify-content-between mb-2"
							>
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									value={this.state.product.productName}
									onChange={this.handleInputChange}
									className="w-50"
									type="text"
									placeholder="Enter product name"
								/>
							</Form.Group>

							<Form.Group
								controlId="brand"
								className="d-flex justify-content-between mb-2"
							>
								<Form.Label>Product brand</Form.Label>
								<Form.Control
									value={this.state.product.brand}
									onChange={this.handleInputChange}
									className="w-50"
									type="text"
									placeholder="Enter product brand"
								/>
							</Form.Group>

							<Form.Group
								controlId="model"
								className="d-flex justify-content-between mb-2"
							>
								<Form.Label>Product Model</Form.Label>
								<Form.Control
									value={this.state.product.model}
									onChange={this.handleInputChange}
									className="w-50"
									type="text"
									placeholder="Enter product model"
								/>
							</Form.Group>

							<Form.Group
								className="d-flex justify-content-between mb-2"
								controlId="description"
							>
								<Form.Label>Product Description</Form.Label>
								<Form.Control
									value={this.state.product.description}
									onChange={this.handleInputChange}
									className="w-50"
									type="text"
									placeholder="Enter product description"
								/>
							</Form.Group>

							<Form.Group
								className="d-flex justify-content-between mb-2"
								controlId="image"
							>
								<Form.Label>Image</Form.Label>
								<Form.Control
									onChange={this.handleInputImage}
									className="w-75"
									type="file"
									placeholder="Enter product image url"
								/>
							</Form.Group>
							{/* <Link to={`/product/`}> */}
								<Button className="m-2" variant="primary" type="submit">
									{this.props.match.params.id
										? "Update Product"
										: "Add Product"}
								</Button>
							{/* </Link> */}
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default AddProduct;