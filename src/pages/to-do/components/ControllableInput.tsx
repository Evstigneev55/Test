import { useState } from 'react';
import useToDoLogic from '../../../helpers/logic';

function ControllableInput() {
	const { addTaskWithReact } = useToDoLogic();
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
					setNewTask('');
					addTaskWithReact(newTask);
				}}
				className="to-do-App__Add-btn"
			>
				add
			</button>
		</div>
	);
}

export default ControllableInput;
