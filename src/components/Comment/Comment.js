import React from 'react';

const Comment = (props) => {
	return (
		<div className="Comment">
			<p id="comment-content">{props.content}</p>
			<p id="comment-author">{props.author}</p>
			{props.author_id === props.user_id &&
				<button id="edit-comment-button" onClick={props.onClickEdit}>edit</button>}
			{props.author_id === props.user_id &&
				<button id="delete-comment-button" onClick={props.onClickDelete}>delete</button>}
		</div>
	);
};

export default Comment;
