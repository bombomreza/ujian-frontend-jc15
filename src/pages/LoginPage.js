import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { loginAction, } from "../redux/actions";

class LoginPage extends Component {
	state = {
		loginInfo: {
			email: "",
			password: "",
		},
	};

	onchangeInput = (e) => {
		this.setState({
			loginInfo: { ...this.state.loginInfo, [e.target.id]: e.target.value },
		});
	};
	clickLogin = () => {
        
		var validasi = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
		const { email, password } = this.state.loginInfo;

		if (email.match(validasi) && password.match(validasi)) {
			Axios.get(`${api_url}/users?email=${email}&password=${password}`)
				.then((res) => {
					if (res.data.length === 1) {
						this.props.loginAction(res.data[0]);
						localStorage.setItem("id", res.data[0].id);
					} else if (res.data.length === 0) {
						Axios.post(`${api_url}/users`, { email: email, password: password })
							.then((res) => {
								this.props.loginAction(res.data);
								localStorage.setItem("id", res.data.id);
								console.log(res.data);
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("email dan password harus mengandung angka dan minimal 6 karakter");
		}
	};
	render() {
		if (this.props.userID !== 0) {
			return <Redirect to="/" />;
		}
		return (
			<div style={{ height: "100vh" }}>
                <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="py-5"                
                >
                    <div style={{ textAlign: "center" }}>
                      <div>
                        <h1>Welcome Back!</h1>
                      </div>
                      <div>
                        <h4>Log in to access your account</h4>
                      </div>
                    </div>                
				    <div className="my-2" style={{ width: "25%" }}>
				    	<Input
				    		placeholder="Email"
				    		type="email"
				    		id="email"
				    		onChange={this.onchangeInput}
                            style={{ textAlign: "center" }}
				    	/>
				    </div>
				    <div className="my-2" style={{ width: "25%" }}>
				    	<Input
				    		placeholder="Password"
				    		type="password"
				    		id="password"
				    		onChange={this.onchangeInput}
                            style={{ textAlign: "center" }}
				    	/>
				    </div>
				    <div>
				    	<Button onClick={this.clickLogin}>Login</Button>
				    </div>
                </div>
			</div>
		);
	}
}
const mapStatetoPros = (state) => {
	return {
		userID: state.user.id,
		emailUser: state.user.email,
	};
};

export default connect(mapStatetoPros, { loginAction })(
	LoginPage
);
