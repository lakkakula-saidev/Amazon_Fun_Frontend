import { Component } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import "./styles.css";
import { GetQuery, Get } from "../CRUD/GetProducts.js";
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
        allBrands: [],
        allCategories: null,
        categories: []
    };

    async componentDidMount() {
        const response = await Get("products");
        /* this.setState({ products: response.result, isLoading: false }); */
        this.setState({ allProducts: response });
        this.setState({ allBrands: [...new Set(this.state.allProducts.map((item) => item.brand))] });
        const Prices = this.state.allProducts.map((item) => item.price);

        const category = await Get("category");
        this.setState({ allCategories: category, isLoading: false });
    }

    /**
     * length / 3
     *
     */

    handleCheckbox(e) {
        console.log(e.target.key);
        if (e.target.checked) {
            this.setState({ brand: [...this.state.brand, e.target.id] });
        } else {
            const brand = [...this.state.brand]; // make a separate copy of the array
            const index = brand.indexOf(e.target.id);
            if (index !== -1) {
                brand.splice(index, 1);
                this.setState({ brand: brand });
            }
        }
    }

    categoryHandleCheckbox(e) {
        console.log(e.target.key);
        if (e.target.checked) {
            this.setState({ categories: [...this.state.categories, e.target.id] });
            console.log(this.state.categories);
        } else {
            const categories = [...this.state.categories]; // make a separate copy of the array
            const index = categories.indexOf(e.target.id);
            if (categories !== -1) {
                categories.splice(index, 1);
                this.setState({ categories: categories });
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
            /*     const queryString = this.state.brand.join();
            const response = await GetQuery("products", `?brand=${queryString}`);
            console.log(prevState, this.state, queryString);
            this.setState({ filteredProducts: response.result, isLoading: false });
            console.log(response); */
            const queryProducts = this.state.allProducts.filter((item) => this.state.brand.join(" ").toLowerCase().includes(item.brand.toLowerCase()));
            console.log(this.state.brand.join(" ").toLowerCase());
            this.setState({ filteredProducts: queryProducts });
        } else if (prevState.categories !== this.state.categories) {
            const queryProducts = this.state.allProducts.filter((item) => this.state.categories.join(" ").toLowerCase().includes(item.Category.name.toLowerCase()));
            console.log(this.state.brand.join(" ").toLowerCase());
            this.setState({ filteredProducts: queryProducts });
        }
    }
    render() {
        const allBrands = this.state.allBrands;
        const allCategories = this.state.allCategories;
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
                                        {allBrands.length > 0 ? (
                                            allBrands.map((item) => (
                                                <Row>
                                                    <Form.Check
                                                        className="d-flex align-items-start"
                                                        onChange={(e) => this.handleCheckbox(e)}
                                                        label={item}
                                                        name="group1"
                                                        type="checkbox"
                                                        key={item}
                                                        id={item}
                                                    />
                                                </Row>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </Form>
                                </Row>
                                {/* <Row className="checkBox1">
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
                                </Row> */}
                                <Row className="checkBox1">
                                    <h6>Category</h6>
                                    <Form>
                                        {allCategories && allCategories.length > 0 ? (
                                            allCategories.map((item) => (
                                                <Row>
                                                    <Form.Check
                                                        className="d-flex align-items-start"
                                                        onChange={(e) => this.categoryHandleCheckbox(e)}
                                                        label={item.name}
                                                        name="group1"
                                                        type="checkbox"
                                                        key={item}
                                                        id={item.name}
                                                    />
                                                </Row>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </Form>
                                </Row>
                            </Col>
                            <Col className="col-md-10">
                                <Row>
                                    {this.state.filteredProducts !== null && this.state.filteredProducts.length > 0
                                        ? filteredProducts.map((product) => (
                                              <Col className="col-3 mb-4" onClick={() => this.props.history.push({ pathname: "/productdetails/" + product._id, state: { item: { product } } })}>
                                                  <Product product={product} key={product._id} />
                                              </Col>
                                          ))
                                        : allProducts.map((product) => (
                                              <Col className="col-3 mb-4" onClick={() => this.props.history.push({ pathname: "/productdetails/" + product._id, state: { item: { product } } })}>
                                                  <Product product={product} key={product._id} />
                                              </Col>
                                          ))}
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
