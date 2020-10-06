import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import Article from '../../../components/Article/Article';
import Comment from '../../../components/Comment/Comment';

class ArticleDetail extends Component {
	state = {
		newComment: "",
	}

	componentDidMount() {
		if(!this.props.userDict) this.props.onGetUsersName();
		this.props.onGetArticle(parseInt(this.props.match.params.id));
		this.props.onGetLoginStatus(1);
		this.props.onGetAllComments();
		if(!this.props.logged_in) this.props.history.push('/login');
	}


	clickEditArticleHandler = (id) => {
		this.props.history.push('/articles/' + id + '/edit');
	};

	clickDeleteArticleHandler = (id) => {
		this.props.onDeleteArticle(id);
		this.props.history.push('/articles');
	};

	clickBackDetailArticleHander = () => {
		this.props.history.push('/articles');
	}


	clickConfirmCreateCommentHandler = (article_id, author_id) => {
		const content = this.state.newComment;
		this.props.onStoreComment(article_id, author_id, content);
		this.setState({newComment: ''});
	}

	render() {
		let title = ''; let content = ''; let author_id = ''; let id = 0;
		if (this.props.selectedArticle) {
			id = this.props.selectedArticle.id;
			title = this.props.selectedArticle.title;
			content = this.props.selectedArticle.content;
			author_id = this.props.selectedArticle.author_id;
		}
		let user_id = this.props.user_id;

		const cmts = this.props.comments.filter((cmt) => cmt.article_id === id).map((cmt) => {
			let comment_author =  (this.props.userDict) ? this.props.userDict[cmt.author_id] : "";
			return (
			<Comment
				key={cmt.id}
				id={cmt.id}
				author_id= {cmt.author_id}
				author={comment_author}
				user_id = {user_id}
				content={cmt.content}
				onClickEdit= {() => {
					let result = window.prompt("",cmt.content);
					if(result) this.props.onEditComment({ ...cmt, content: result });
				}}
				onClickDelete= {() => this.props.onDeleteComment(cmt.id)}
			/>
			);
		});

		return(
			<div className="ArticleDetail">
				<div className="article">
				<Article
					author= {(this.props.userDict) ? this.props.userDict[author_id] : ""}
					title= {title}
					content= {content}
					// author_id= {author_id}
					// user_id= {user_id}
					// id= {id}
					// onClickEdit= {() => this.props.history.push('/articles/' + id + '/edit') }
					// onClickDelete= {() => {this.props.onDeleteArticle(id);
					// 						this.props.history.push('/articles');}}
					// onClickGoBack= {() => this.props.history.push('/articles') }
				/>
				</div>

				<div className="article-button">
					{author_id === user_id &&
					<button
						id="edit-article-button"
						onClick={() => this.clickEditArticleHandler(id)}
					>edit</button>}
					{author_id === user_id &&
					<button
						id="delete-article-button"
						onClick={() => this.clickDeleteArticleHandler(id)}
					>delete</button>}
					<button
						id="back-detail-article-button"
						onClick={() => this.clickBackDetailArticleHander()}
					>go to list</button>
				</div>

				<div className="comments">
				<input
					id="new-comment-content-input"
					type="text"
					value={this.state.newComment}
					onChange={(event) => this.setState({ newComment: event.target.value })}
				></input>

				<button
					id="confirm-create-comment-button"
					onClick= {() => this.clickConfirmCreateCommentHandler(id, user_id)}
					disabled={(this.state.newComment) ? '' : 'disabled'}
					>
					confirm
				</button>

				{cmts}
				</div>
			</div>

			);
	}
}


const mapStateToProps = state => {
	return {
		  selectedArticle: state.blogReducer.selectedArticle,
		  logged_in: state.userReducer.logged_in,
		  user_id: state.userReducer.id,
		  userDict: state.userReducer.userDict,
		  comments: state.commentReducer.comments,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
		onDeleteArticle: (id) => dispatch(actionCreators.deleteArticle(id)),
		onGetLoginStatus: (id) => dispatch(actionCreators.getLoginStatus(id)),
		onGetUsersName: () => dispatch(actionCreators.getUsersName()),
		onGetAllComments: () => dispatch(actionCreators.getComments()),
		onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
		onEditComment: (cmt) => dispatch(actionCreators.editComment(cmt)),
		onStoreComment: (article_id, author_id, content) =>
			dispatch(actionCreators.postComment({content: content, author_id: author_id, article_id: article_id})),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);


