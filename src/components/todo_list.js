import React from 'react';
import { Link } from 'react-router-dom';

const TodoList = ({ loading, listName, todoList }) => {
	//done: ({loading, completed, id}) destructuring
	if (loading) return <h1>Please wait, loading...</h1>;
	return (
		<div className="row justify-content-sm-center">
			<div className="col-sm-8 list-group">
				{todoList.map(todo => {
					return (
						<Link
							key={todo.id}
							className={`list-group-item completed${todo.completed}`}
							to={`/list/${listName}/todo/${todo.id}`}>
							{todo.text}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default TodoList;
