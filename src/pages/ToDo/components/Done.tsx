import React from 'react';
import { useTodo } from '../context.tsx';

const Done: React.FC = () => {
	const { done, toggleDone, removeTask } = useTodo();

	return (
		<ol className="to-do-App__ol">
			{done.length > 0 && <h3>Completed</h3>}

			{done.map((task) => (
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
				</li>
			))}
		</ol>
	);
};

export default Done;
