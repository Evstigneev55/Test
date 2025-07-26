import React, { useState } from 'react';
import TodoContextProvider, { useTodo } from './context.tsx';
import './styles.css';
import NotDone from './components/NotDone.tsx';
import Done from './components/Done.tsx';

const Todo = () => {
	return (
		<TodoContextProvider>
			<div className="to-do-App">
				<h1 className="to-do-App__h1">to-do App</h1>

				<ControllableInput />
				<NotDone />
				<Done />
			</div>
		</TodoContextProvider>
	);
};

function ControllableInput() {
	const { addTask } = useTodo();
	const [newTask, setNewTask] = useState('');

	return (
		<div className="to-do-App__Area-Input">
			<input
				id="newTaskReact"
				type="text"
				placeholder="controllable React's input"
				value={newTask}
				onChange={(e) => {
					setNewTask(e.target.value);
				}}
			/>
			<button
				disabled={!newTask}
				onClick={() => {
					addTask(newTask);
					setNewTask('');
				}}
				className="to-do-App__Add-btn"
			>
				add
			</button>
		</div>
	);
}

export default Todo;
