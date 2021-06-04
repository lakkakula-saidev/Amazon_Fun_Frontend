import { Component } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import "./styles.css";
import Get from "../CRUD/GetProducts.js";
import { GetQuery } from "../CRUD/GetProducts.js";
import Product from "./product.jsx";

class Home extends Component {
    state = {
        allproducts: null,
        filteredProducts: null,
        isLoading: true,
        price: 10,
        brand: [],
        averagePrice: null,
        priceRange: [],
        minPrice: null,
        maxPrice: null,
        allBrands: []
    };

    async componentDidMount() {
        const response = await Get("products");
        /* this.setState({ products: response.result, isLoading: false }); */
        this.setState({ allProducts: response.result, isLoading: false });
        console.log(response.result);
        const brands = new Set(this.state.allProducts.map((item) => item.brand));
        this.setState({ allBrands: [...this.state.allBrands, brands] });
        console.log(brands);
        const Prices = this.state.allProducts.map((item) => item.price);
        console.log(this.state.allBrands);
    }

    /**
     * length / 3
     *
     */

    handleCheckbox(e) {
        console.log(e.target.key);
        if (e.target.checked) {
            this.setState({ brand: [...this.state.brand, e.target.id] });
            console.log(this.state.brand);
        } else {
            const brand = [...this.state.brand]; // make a separate copy of the array
            const index = brand.indexOf(e.target.id);
            if (index !== -1) {
                brand.splice(index, 1);
                this.setState({ brand: brand });
            }
        }
    }

    handlePrice(e) {
        if (e.target.checked) {
            this.setState({ brand: [...this.state.brand, e.target.id] });
            console.log(this.state.brand);
        } else {
            const brand = [...this.state.brand]; // make a separate copy of the array
            const index = brand.indexOf(e.target.id);
            if (index !== -1) {
                brand.splice(index, 1);
                this.setState({ brand: brand });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
        if (prevState.brand !== this.state.brand) {
            const queryString = this.state.brand.join();
            const response = await GetQuery("products", `?brand=${queryString}`);
            console.log(prevState, this.state, queryString);
            this.setState({ filteredProducts: response.result, isLoading: false });
            console.log(response);
        }
    }
    render() {
        console.log(this.state.allProducts);
        /*     const brands = this.state.allBrands; */
        const allProducts = this.state.allProducts;
        const filteredProducts = this.state.filteredProducts;

        return (
            <Container fluid>
                <h1>Our Products</h1>
                <Row>
                    {this.state.isLoading && <Spinner animation="border" variant="primary" />}
                    {!this.state.isLoading && (
                        <>
                            <Col className="col-md-2 ">
                                <h5>Filter Products</h5>
                                <Row className="checkBox1">
                                    <h6>Brand</h6>
                                    <Form>
                                        {allProducts.length > 0 ? (
                                            allProducts.map((item) => (
                                                <Row>
                                                    <Form.Check
                                                        className="d-flex align-items-start"
                                                        onChange={(e) => this.handleCheckbox(e)}
                                                        label={item.brand}
                                                        name="group1"
                                                        type="checkbox"
                                                        key={item._id}
                                                        id={item.brand}
                                                    />
                                                </Row>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </Form>
                                </Row>
                                <Row className="checkBox1">
                                    <h6>Price</h6>
                                    <Form>
                                        <Row>
                                            <Form.Check className="d-flex align-items-start " onChange={(e) => this.handlePrice(e)} label="< 10" name="group1" type="checkbox" id={10} />
                                            <Form.Check className="d-flex align-items-start " onChange={(e) => this.handlePrice(e)} label="10-20" name="group1" type="checkbox" id={20} />
                                            <Form.Check className="d-flex align-items-start " onChange={(e) => this.handlePrice(e)} label="20-50" name="group1" type="checkbox" id={50} />
                                            <Form.Check className="d-flex align-items-start " onChange={(e) => this.handlePrice(e)} label="less than 100" name="group1" type="checkbox" id={100} />
                                            <Form.Check className="d-flex align-items-start " onChange={(e) => this.handlePrice(e)} label="above 100" name="group1" type="checkbox" id={100} />
                                        </Row>
                                    </Form>
                                </Row>
                            </Col>
                            <Col className="col-md-10">
                                <Row>
                                    {this.state.filteredProducts
                                        ? filteredProducts.map((product) => <Product product={product} key={product._id} />)
                                        : allProducts.map((product) => <Product product={product} key={product._id} />)}
                                </Row>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        );
    }
}

export default Home;
