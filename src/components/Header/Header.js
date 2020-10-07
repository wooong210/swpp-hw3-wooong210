
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { withRouter } from 'react-router';
import './Header.css';

class Header extends Component {

	componentDidMount() {
		this.props.onGetLoginStatus(1);
	}

	clickLogoutHandler = () => {
		this.props.onLogout(this.props.user_id);
		this.props.history.push('/login');
	}

	render(){
		return (
			<div>
				{this.props.logged_in && <button id="logout-button" className="logout-button" onClick={() => this.clickLogoutHandler()}>Logout</button>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		logged_in: state.userReducer.logged_in,
		user_id: state.userReducer.id
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetLoginStatus: (id) => dispatch(actionCreators.getLoginStatus(id)),
		onLogout: (id) => dispatch(actionCreators.userLogout(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
