import React from 'react';
import { useTodo } from '../context.tsx';

interface NotDoneProps {}
const NotDone: React.FC<NotDoneProps> = () => {
	const { todo, toggleDone, removeTask, move } = useTodo();

	return (
		<ol className="to-do-App__ol">
			{todo.length > 0 && <h3> Not Completed</h3>}

			{todo.map((task, index) => (
				<li key={task.id}>
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={() => {
							toggleDone(task);
						}}
					/>

					<span>{task.text}</span>

					<button className="del-btn" onClick={() => removeTask(task)}>
						delete
					</button>
					<button
						disabled={index < 1}
						type="button"
						onClick={() => {
							move(task, 'up');
						}}
					>
						up
					</button>
					<button
						disabled={index === todo.length - 1}
						type="button"
						onClick={() => {
							move(task, 'down');
						}}
					>
						down
					</button>
				</li>
			))}
		</ol>
	);
};

export default NotDone;
