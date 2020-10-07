import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../../../components/Article/Article';
import * as actionCreators from '../../../store/actions/index';
import './NewArticle.css'

class NewArticle extends Component {
	state = {
		title: '',
		author_id: '',
		content: '',
		preview: false,
	};

	componentDidMount() {
		this.props.onGetLoginStatus(1);
		if(!this.props.logged_in) this.props.history.push('/login');
		if(!this.props.userDict) this.props.onGetUsersName();
		this.setState({	author_id: this.props.user_id });
	}

	clickBackCreateArticleHandler = () => {
		this.props.history.push('/articles');
	}

	clickConfirmCreateArticleHandler = () => {
		const data = { title: this.state.title, author_id: this.state.author_id, content: this.state.content };
		this.props.onStoreArticle(data.title, data.author_id, data.content);
		alert('submitted');
	}

	clickPreviewTabHandler = () => {
		this.setState({
			preview: true,
		});
	}

	render() {
		return(
		<div className="NewArticle">
			{this.state.preview ?
			<Article
				author= {(this.props.userDict) ? this.props.userDict[this.state.author_id] : ""}
				title= {this.state.title}
				content= {this.state.content}
			/> :
			<div className="NewArticleInput">
				<label>title</label>
				<input
					id="article-title-input"
					type="text"
					value={this.state.title}
					onChange={(event) => this.setState({ title: event.target.value })}
				></input>
				<label>content</label>
				<textarea rows="4" type="text"
					id="article-content-input"
					value={this.state.content}
					onChange={(event) => this.setState({ content: event.target.value })}>
				</textarea>
			</div>}
			<button
				id="back-create-article-button"
				onClick={() => this.clickBackCreateArticleHandler()}
			>go to list</button>
			<button
				id="confirm-create-article-button"
				onClick={() => this.clickConfirmCreateArticleHandler()}
				disabled={(this.state.content && this.state.title) ? '' : 'disabled'}
			>confirm</button>
			<button
				id="preview-tab-button"
				onClick={() => this.clickPreviewTabHandler()}
			>preview tab</button>
			<button
				id="write-tab-button"
				onClick={() => this.setState({ preview: false })}
			>write tab</button>
		</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		logged_in: state.userReducer.logged_in,
		user_id: state.userReducer.id,
		userDict: state.userReducer.userDict

	};
};

const mapDispatchToProps = dispatch => {
	return {
		onStoreArticle: (title, author_id, content) =>
			dispatch(actionCreators.postArticle({title: title, author_id: author_id, content: content})),
		onGetLoginStatus: (id) => dispatch(actionCreators.getLoginStatus(id)),
		onGetUsersName: () => dispatch(actionCreators.getUsersName())

	};
};


export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
