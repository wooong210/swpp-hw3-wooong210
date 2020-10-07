import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './Login.css';
class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	componentDidMount() {
		this.props.onGetLoginStatus(1);
		if(!this.props.userDict) this.props.onGetUsersName();
	}

	componentDidUpdate() {
		if(this.props.logged_in)
			this.props.history.push('/articles');
	}

	clickLoginHandler = () => {
		const data = { email: this.state.email, password: this.state.password }
		if (data.email === 'swpp@snu.ac.kr' && data.password === 'iluvswpp'){
			this.props.onLogin();
			this.props.history.push('/articles');
		}
		else {
			alert('Email or password is wrong');
			this.setState({ email: '', password: '' });
		}
	}

	render(){

		return (
		<div className="Login">
			<h1>Login in hw3</h1>
			<div className="login-email">
				<label>email   </label>
				<input
					id="email-input"
					type="text"
					value={this.state.email}
					onChange={(event) => this.setState({ email: event.target.value })}
				></input>
			</div>
			<div className="login-password">
				<label>password </label>
				<input
					id="pw-input"
					type="text"
					value={this.state.password}
					onChange={(event) => this.setState({ password: event.target.value })}
				></input>
			</div>
			<button id="login-button" className="login-button" onClick={() => this.clickLoginHandler()}>Login</button>
		</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		logged_in: state.userReducer.logged_in,
		userDict: state.userReducer.userDict

	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogin: () => dispatch(actionCreators.userLogin(1)),
		onGetLoginStatus: (id) => dispatch(actionCreators.getLoginStatus(id)),
		onGetUsersName: () => dispatch(actionCreators.getUsersName())

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
