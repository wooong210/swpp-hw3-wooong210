import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../../../components/Article/Article';
import * as actionCreators from '../../../store/actions/index';

class ArticleEdit extends Component {
	state = {
		title: "",
		author_id: '',
		content: "",
		preview: false,
	};

	componentDidMount() {
		this.props.onGetArticle(parseInt(this.props.match.params.id));
		if(!this.props.userDict) this.props.onGetUsersName();
		this.props.onGetLoginStatus(1);
		if(!this.props.logged_in) this.props.history.push('/login');
		if(this.props.selectedArticle){
			this.setState({ title: this.props.selectedArticle.title,
							content: this.props.selectedArticle.content,
							id: this.props.selectedArticle.id,
							author_id: this.props.selectedArticle.author_id,
			});
		}
	}

	clickBackEditArticleHandler = () => {
		if(this.state.title !== this.props.selectedArticle.title || this.state.content !== this.props.selectedArticle.content){
			let conf = window.confirm("Are you sure? The change will be lost.");
			if(conf) this.props.history.goBack();
		}
		else this.props.history.goBack();
	}

	clickConfirmEditArticleHandler = () => {
		const data = { id: this.state.id, title: this.state.title, author_id: this.state.author_id, content: this.state.content };
		this.props.onStoreArticle(data.id, data.title, data.author_id, data.content);
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
				<textarea rows="4" type="text" value={this.state.content}
				onChange={(event) => this.setState({ content: event.target.value })}>
				</textarea>
			</div>}
			<button
				id="back-Edit-article-button"
				onClick={() => this.clickBackEditArticleHandler()}
			>back to article</button>
			<button
				id="confirm-Edit-article-button"
				onClick={() => this.clickConfirmEditArticleHandler()}
				disabled={(this.state.content && this.state.title) ? '' : 'disabled'}
			>confirm</button>
			<button
				id="preview-tab-button"
				onClick={() => this.setState({ preview: true })}
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
		selectedArticle: state.blogReducer.selectedArticle,
		logged_in: state.userReducer.logged_in,
		userDict: state.userReducer.userDict

	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
		onStoreArticle: (id, title, author_id, content) =>
			dispatch(actionCreators.editArticle({id: id, title: title, author_id: author_id, content: content})),
		onGetLoginStatus: (id) => dispatch(actionCreators.getLoginStatus(id)),
		onGetUsersName: () => dispatch(actionCreators.getUsersName())

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
