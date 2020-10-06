import React from 'react';

const Article = (props) => {
	return (
		<div className="Article">
			<h3 id="article-title">{props.title}</h3>
			<h5 id="article-author">{props.author}</h5>
			<p id="article-content">{props.content}</p>
			{/* {props.author_id === props.user_id &&
				<button id="edit-article-button" onClick={props.onClickEdit}>edit</button>}
			{props.author_id === props.user_id &&
				<button id="delete-article-button" onClick={props.onClickDelete}>delete</button>}
			<button id="back-detail-article-button" onClick={props.onClickGoBack}>go to list</button> */}
		</div>
	);
};

export default Article;
