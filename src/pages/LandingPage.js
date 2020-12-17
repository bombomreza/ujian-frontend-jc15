import React, { Component } from "react";
import { connect } from "react-redux";
import { ProductCard } from "../component";
import { fetchProducts } from "../redux/actions";
class LandingPage extends Component {
	state = {};

	componentDidMount() {
		const { fetchProducts } = this.props;
		fetchProducts();
	}

	renderCard = () => {
		const { product } = this.props;
		return product.map((val, i) => {
			return (
				<div className="m-5">
					<ProductCard
						image={val.image}
						name={val.name}
						price={val.price}
						id={val.id} 
					/>
				</div>
			);
		});
	};
	render() {
		return (
			<div className="d-flex ">
				<div></div>
				{this.renderCard()}
				<div></div>
			</div>
		);
	}
}
const mapStatetoProps = ({ product }) => {
	return {
		product: product.productList,
	};
};

export default connect(mapStatetoProps, { fetchProducts })(LandingPage);
