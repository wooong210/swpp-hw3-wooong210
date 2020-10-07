import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ArticleList from '../../components/ArticleList/ArticleList';
import * as actionCreators from '../../store/actions/index';
import './style.css';

class Articles extends Component {
	state = {
		selectedTodo: null,
	}

	componentDidMount() {
		this.props.onGetAll();
		this.props.onGetLoginStatus(1);
		if(!this.props.userDict) this.props.onGetUsersName();
		if(!this.props.logged_in) this.props.history.push('/login');
	}

	clickAtcHandler = (atc) => {
		this.props.history.push('/articles/' + atc.id);
	}

	clickCreateHandler = () => {
		this.props.history.push('/articles/create');
	}

	render() {
		const atcs = this.props.storedArticlces.map((atc) => {
			let name = (this.props.userDict) ? this.props.userDict[atc.author_id] : "";
			return (
			<ArticleList
				key={atc.id}
				id={atc.id}
				name={name}
				title={atc.title}
				author={atc.author_id}
				clicked={() => this.clickAtcHandler(atc)}
			/>
			);
		});

		return (
			<div className="Articles">
				<div className='atcs'>
					{atcs}
				</div>
				<button id="create-article-button" className="button" onClick={() => this.clickCreateHandler()}> new article </button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		storedArticlces: state.blogReducer.articles,
		logged_in: state.userReducer.logged_in,
		userDict: state.userReducer.userDict
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetAll: () => dispatch(actionCreators.getArticles()),
		onGetLoginStatus: (id) => dispatch(actionCreators.getLoginStatus(id)),
		onGetUsersName: () => dispatch(actionCreators.getUsersName())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Articles));

