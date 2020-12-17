/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { addToCartAction } from "../redux/actions";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import swal from "sweetalert";
import cardButton from "../image/cartbutton.png";

class ProductModal extends Component {
	state = { isOpen: false, qty: 1, data: [], check: false };

	toggle = () => {
		const { emailUser } = this.props;
		if (emailUser !== "") {
			this.setState({ isOpen: !this.state.isOpen });
		} else {
			swal("Error", "Please login first", "info")
		}
	};

	toastNotif = () => {
		return (
			<div className="p-3 my-2 rounded">
				<Toast>
					<ToastHeader>Success</ToastHeader>
					<ToastBody>Product added to cart!</ToastBody>
				</Toast>
			</div>
		);
	};
	successBtn = () => {
		this.setState({ isOpen: !this.state.isOpen, check: false });
	};
	addedToCartSuccess = () => {
		return (
			<div>
				<Button color="secondary" onClick={this.successBtn}>
					Close
				</Button>
			</div>
		);
	};
	cartNotYetAdded = () => {
		const { products, id } = this.props;
		let res = products.find((val) => {
			return id === val.id;
		});

		return (
			<div>
				<Button
					color="primary"
					onClick={this.addToCartBtn}
					disabled={res.stock === 0}
                    style={{marginRight:"10px"}}
				>
					Add to Cart
				</Button>
				<Button color="secondary" onClick={this.toggle}>
					Cancel
				</Button>
			</div>
		);
	};
	addToCartBtn = () => {
		const { addToCartAction, products, id, userID, cart } = this.props;
		let res = products.find((val) => {
			return val.id === id;
		});
		let data = {
			name: res.name,
			categoryID: res.categoryID,
			image: res.image,
			qty: this.state.qty,
			userID: userID,
			price: res.price,
		};
		let result = cart.find((val) => {
			return val.name === res.name;
		});
		if (result) {
			let tot = result.qty + this.state.qty;
			if (tot <= res.stock) {
				addToCartAction(data);
				this.setState({
					check: true,
				});
			} else {
                swal("Out of Stock","" ,"info")
			}
		} else {
			addToCartAction(data);
			this.setState({
				check: true,
			});
		}
	};
	increaseBtn = () => {
		this.setState({ qty: this.state.qty + 1 });
	};
	decreaseBtn = () => {
		this.setState({ qty: this.state.qty - 1 });
	};
	renderProducts = () => {
		const { qty } = this.state;
		const { products, id } = this.props;
		let res = products.find((val) => {
			return val.id === id;
		});

		return (
            <tr>
                <td><h6>{res.name}</h6></td>
                <td><img src={res.image} alt="img not found" height="70px" /></td>
                <td>{res.price}</td>
                <td>{res.stock}</td>
                <td>
 			 		<Button onClick={this.decreaseBtn} disabled={this.state.qty === 1}>
			 			-
				    </Button>    
                    <span className="mx-2">{qty}</span> 
					<Button
						onClick={this.increaseBtn}
						disabled={this.state.qty === res.stock}
					>
						+
					</Button>              
                </td>
            </tr>
		);
	};

	render() {
		return (
			<div>
				<Button  onClick={this.toggle}>
				<img src ={cardButton} style={{width:"25px"}}/>
				</Button>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add To Cart</ModalHeader>
					<ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.check ? this.toastNotif() : this.renderProducts()}</tbody>
                        </Table>

					</ModalBody>
					<ModalFooter>
						{this.state.check
							? this.addedToCartSuccess()
							: this.cartNotYetAdded()}
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		products: state.product.productList,
		emailUser: state.user.email,
		userID: state.user.id,
		cart: state.cart.cart,
	};
};
export default connect(mapStatetoProps, { addToCartAction })(ProductModal);
