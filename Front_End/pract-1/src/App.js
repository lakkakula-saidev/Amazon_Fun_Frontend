import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import TopNavbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/ListProduct/Product";
import AddProduct from "./components/Product/AddProduct/AddProduct";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";

function App() {
	return (
		<div className="App">
			<Router>
				<TopNavbar />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/product" component={Product} exact />
					<Route path="/product/:id" component={Product} exact />
					<Route path="/addproduct" component={AddProduct} exact />
					<Route path="/updateproduct/:id" component={AddProduct} exact />
					<Route path="/productdetails/:id" component={ProductDetails} exact />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
