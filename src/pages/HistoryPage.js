import Axios from "axios";
import { Button } from "reactstrap";
import React, { Component } from "react";
import { Table } from "reactstrap";
import { api_url } from "../helpers/api_url";

class HistoryPage extends Component {
	state = { history: [] };
	componentDidMount() {
		this.fetchHistory();
	}

	fetchHistory = () => {
		Axios.get(`${api_url}/transaction`)
			.then((res) => {
				this.setState({
					history: res.data,
				});
			})
			.catch((err) => {});
	};
	cancelOrder = (id, items) => {
		items.forEach((val) => {
			Axios.get(`${api_url}/products?name=${val.name}`)
				.then((res) => {
					Axios.patch(`${api_url}/products/${res.data[0].id}`, {
						stock: res.data[0].stock + val.qty,
					})
						.then((res) => {})
						.catch((err) => {});
				})
				.catch((err) => {});
		});
		Axios.delete(`${api_url}/transaction/${id}`)
			.then((result) => {
                this.fetchHistory();
			})
			.catch((err) => {});
	};
	renderHistory = () => {
		const { history } = this.state;

		return history.map((val, index) => {
			let res = val.items.map((val) => {
				return (
					<div className="d-flex justify-content-between">
						<div> {val.name}</div>
						<div>
                        <img src={val.image} alt="img not found" height="40px" />
                        </div>

					</div>
				);
			});
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{val.date}</td>
					<td>{res}</td>
					<td>{val.total}</td>
					<td>Belum Bayar</td>
					<td>
						<Button onClick={() => this.cancelOrder(val.id, val.items)}>
							Cancel
                        
						</Button>
					</td>
					<td></td>
				</tr>
			);
		});
	};
	render() {
		console.log(this.state.history);
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Items</th>
							<th>Total</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderHistory()}</tbody>
				</Table>
			</div>
		);
	}
}

export default HistoryPage;
