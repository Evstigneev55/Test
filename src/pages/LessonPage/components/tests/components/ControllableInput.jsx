import { useState } from 'react';

function ControllableInput({ theLastIncrementIdFromAll, dispatchNotDoneT, notDoneTasks }) {
	const [newTask, setNewTask] = useState('');

	function addTaskWithReact() {
		if (newTask) {
			dispatchNotDoneT({
				type: 'add_task',
				newTaskObj: { id: theLastIncrementIdFromAll() + 1, text: newTask, isDone: false },
			});

			setNewTask('');
		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
	}

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
				autoFocus
				spellCheck
			/>
			<button disabled={!newTask} onClick={addTaskWithReact} className="to-do-App__Add-btn">
				add
			</button>
		</div>
	);
}

export default ControllableInput;