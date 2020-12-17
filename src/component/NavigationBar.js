/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarBrand,
	Nav,
	NavLink,
    NavbarText,
    Button
} from "reactstrap";
import { logoutAction } from "../redux/actions";
import cartImage from '../image/cart.png'

class NavBar extends Component {
	state = { isOpen: false };

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	logout = () => {
		const { logoutAction } = this.props;
		logoutAction();
		localStorage.removeItem("id");
	};


	render() {
		const { userEmail } = this.props;
		return (
			<div>
				<Navbar 
          			style={{backgroundColor: "black", color: "white"}}
          			dark
          			expand="md"	                
                >
                    <Link to="/">
					    <NavbarBrand >Toko Sepatu</NavbarBrand>
                    </Link>
					{/* <NavbarToggler onClick={this.toggle} /> */}
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
						</Nav>
            {userEmail ? (
              <div>
              <Link to="/history">
              <NavbarBrand>
                <NavLink >History</NavLink>
              </NavbarBrand>
              </Link>
              <Link to="./cart" >
              <NavbarBrand  style={{backgroundColor:"black"}} className="notification"> 
              <img src={cartImage} style={{width:"50px"}} /> 
			  <span className="badge"> {this.props.cart.length} </span>
			
              </NavbarBrand>
              </Link>
              <NavbarText style={{marginRight:"10px"}}> <h6>{userEmail}</h6></NavbarText>
              <Link to="/">
              <Button outline color="secondary" onClick={this.logout}>Logout</Button>
              </Link>
              </div>
            ) : null}
              {userEmail ? (
                null
            ) : (
              <Link to="/login">
              <Button outline color="secondary">Login</Button>
              </Link>
            ) }	                       
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
		userRole: state.user.role,
		userEmail: state.user.email,
		cart: state.cart.cart,
	};
};

export default connect(mapStatetoProps, { logoutAction })(NavBar);
