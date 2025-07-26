import { useReducer, useEffect } from 'react';

function NotDone({ dispatchNotDoneT, notDoneTasks, dispatchDoneT }) {
	return (
		<ol className="to-do-App__ol">
			{notDoneTasks.length > 0 && <h3> Not Completed</h3>}

			{notDoneTasks.map((task, index) => (
				<li key={task.id}>
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={(e) => {
							dispatchNotDoneT({ type: 'del_task', TaskId: task.id });
							dispatchDoneT({ type: 'add_task', newTaskObj: { ...task, isDone: true } });
						}}
					/>

					<span>{task.text}</span>

					<button
						className="del-btn"
						onClick={() => dispatchNotDoneT({ type: 'del_task', TaskId: task.id })}
					>
						delete
					</button>
					<button
						type="button"
						onClick={() => {
							if (index < 1) return;
							dispatchNotDoneT({ type: 'on_Click_Up_Btn', index: index });
						}}
					>
						up
					</button>
					<button
						type="button"
						onClick={() => {
							if (index === notDoneTasks.length - 1) return;
							dispatchNotDoneT({ type: 'on_Click_Down_Btn', index: index });
						}}
					>
						down
					</button>
				</li>
			))}
		</ol>
	);
}

// export function ControllableInput({theLastIncrementIdFrom, dispatchNotDoneT, notDoneTasks}) {
// 	const [newTask, setNewTask] = useState('');

// 	function addTaskWithReact() {
// 		if (newTask) {
// 			dispatchNotDoneT({
// 				type: 'add_task_with_react',
// 				newTaskObj: { id: theLastIncrementIdFrom(notDoneTasks) + 1, text: newTask, isDone: false },
// 			});

// 			setNewTask('');
// 		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
// 	}

// 	return (
// 		<div className="to-do-App__Area-Input">
// 			<input
// 				id="newTaskReact"
// 				type="text"
// 				placeholder="controllable React's input"
// 				value={newTask}
// 				onChange={(event) => {
// 					setNewTask(event.target.value);
// 				}}
// 				autoFocus
// 				spellCheck
// 			/>
// 			<button disabled={!newTask} onClick={addTaskWithReact} className="to-do-App__Add-btn">
// 				add
// 			</button>
// 		</div>
// 	);
// }

export default NotDone;
