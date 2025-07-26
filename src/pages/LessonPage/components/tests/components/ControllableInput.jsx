import { useState } from 'react';

function ControllableInput({ addTaskWithReact }) {
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
			<button disabled={!newTask} onClick={() => {addTaskWithReact(newTask, setNewTask)}} className="to-do-App__Add-btn">
				add
			</button>
		</div>
	);
}

export default ControllableInput;
