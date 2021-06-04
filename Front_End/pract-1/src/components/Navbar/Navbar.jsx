
import { Component } from 'react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Cart from '../CartModel/Cart.jsx'


class TopNavbar extends Component{
    render() {
        return (
					<Navbar className="p-2 navbar-dark" bg="dark" expand="lg">
						<Navbar.Brand href="/">Amazon</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Link to="/">Home</Link>
								<Link to="/product">Product</Link>
								<Link to="/addproduct">Add Product</Link>
							</Nav>
							<Form inline>
								<FormControl
									type="text"
									placeholder="Search"
									className="me-sm-2"
						/>
						<Cart />
							</Form>
						</Navbar.Collapse>
					</Navbar>
				);
    }
}

export default TopNavbar;