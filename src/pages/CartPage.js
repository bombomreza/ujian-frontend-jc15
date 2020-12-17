import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
	checkoutAction,
} from "../redux/actions";
import Swal from "sweetalert2";

class CartPage extends Component {
	state = {};
	componentDidMount() {
		const { userID, fetchCartAction } = this.props;
		fetchCartAction(userID);
	}
	deleteBtn = (id, userID) => {
		const { deleteCartAction } = this.props;
		deleteCartAction(id, userID);
	};
	addBtn = (name, qty, id) => {
		const { addQtyAction, userID } = this.props;
		addQtyAction(name, qty, id, userID);
	};
	subBtn = (name, qty, id) => {
		const { subQtyAction, userID } = this.props;
		subQtyAction(name, qty, id, userID);
	};
	renderCart = () => {
		const { cart } = this.props;
		return cart.map((val, index) => {
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt="img not found" height="50px" />
					</td>

					<td style={{textAlign:"center"}}>
						<Button onClick={() => this.subBtn(val.name, val.qty, val.id)}>
							-
						</Button>
                        <span className="mx-2">{val.qty}</span>
						<Button onClick={() => this.addBtn(val.name, val.qty, val.id)}>
							+
						</Button>

					</td>
					<td>{val.qty * val.price}</td>
					<td>
						<Button onClick={() => this.deleteBtn(val.id, val.userID)}>
							delete
						</Button>
					</td>
				</tr>
			);
		});
	};
	grandTotal = () => {
		const { cart } = this.props;
		let total = 0;
		cart.forEach((val) => {
			total += val.qty * val.price;
		});
		return total;
	};
	checkOut = () => {
		const { cart, userID, checkoutAction } = this.props;
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		const data = {
			date: `${day}-${month}-${year}`,
			total: this.grandTotal(),
			items: cart,
			userID: userID,
		};

		checkoutAction(data);
	};
	checkOutAlert = () => {
		Swal.fire({
			title: "Are you sure want to checkout?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, check my cart out",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Your file has been deleted.", "success");
				this.checkOut();
			}
		});
	};
	render() {
		const { cart } = this.props;
		if (cart.length === 0) {
			return (
				<div style={{textAlign:"center"}}>
					<h1>Your cart is empty</h1>
				</div>
			);
		}
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Image</th>
							<th>Qty</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderCart()}</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<h3>GrandTotal:</h3>
							</td>
							<td> Rp. {this.grandTotal().toLocaleString()}</td>
							<td>
								<Button onClick={this.checkOutAlert}>check out</Button>
							</td>
						</tr>
					</tfoot>
				</Table>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		cart: state.cart.cart,
		userID: state.user.id,
	};
};
export default connect(mapStatetoProps, {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
	checkoutAction,
})(CartPage);