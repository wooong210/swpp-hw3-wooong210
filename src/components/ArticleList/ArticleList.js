import React from 'react';
import './ArticleList.css';

const ArticleList = (props) => {
	return (
		<button className="article-list" onClick={props.clicked}>
			<div>{props.id}</div>
			<div>{props.title}</div>
			<div>author : {props.name}</div>
		</button>
	);
};

export default ArticleList;
