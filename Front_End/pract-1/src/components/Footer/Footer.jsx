import {Component} from "react";
import {Container} from "react-bootstrap";

class Footer extends Component {
	render() {
		return (
			<Container fluid className="fixed-bottom bg-dark text-light">
				<h1>Footer</h1>
			</Container>
		);
	}
}

export default Footer;
