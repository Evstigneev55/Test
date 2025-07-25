import { useReducer, useState, useEffect } from 'react';

import Done from './components/Done';
import NotDone from './components/NotDone';

function reducerTasks(t, action) {
	switch (action.type) {
		case 'del_task':
			const newArrTasks = t.filter((_, i) => i !== action.index);
			return newArrTasks;

		case 'add_task_with_react':
			return [...t, action.newTaskObj];

		case 'add_task_with_form':
			return [...t, action.newTaskObj];

		case 'on_Click_Up_Btn':
			const updatedTasksUp = [...t];
			[updatedTasksUp[action.index - 1], updatedTasksUp[action.index]] = [
				updatedTasksUp[action.index],
				updatedTasksUp[action.index - 1],
			];
			return updatedTasksUp;

		case 'on_Click_Down_Btn':
			const updatedTasksDown = [...t];
			[updatedTasksDown[action.index], updatedTasksDown[action.index + 1]] = [
				updatedTasksDown[action.index + 1],
				updatedTasksDown[action.index],
			];
			return updatedTasksDown;

		case 'click_checkbox':
			// TRY: const {e, task} = action;
			const newTasksArr = [...t];
			newTasksArr.find((ta) => ta.id === action.task.id).isDone = action.e.target.checked;
			console.log(action);

			// Если выполнили задачу, то добавь её в массив выполненных, иначе в массив не выполн.
			if (action.e.target.checked)
				action.dispatchDoneT({
					type: 'add_task_with_react',
					newTaskObj: {
						id: action.theLastIncrementIdFromAll() + 1,
						text: action.task.text,
						isDone: action.e.target.checked,
					},
				});
			else
				action.dispatchNotDoneT({
					type: 'add_task_with_react',
					newTaskObj: {
						id: action.theLastIncrementIdFromAll() + 1,
						text: action.task.text,
						isDone: action.e.target.checked,
					},
				});

			return newTasksArr.filter((t) => t.id !== action.task.id);
	}
	throw Error('Unknown action: ' + action.type);
}

const Test_2 = () => {
	const [doneTasks, dispatchDoneT] = useReducer(reducerTasks, initTasksFrom('arrTasksDone')); //! doesn`t work
	const [notDoneTasks, dispatchNotDoneT] = useReducer(
		reducerTasks,
		initTasksFrom('arrTasksNotDone')
	);
	const [newTask, setNewTask] = useState('');

	// const notDoneTasks = TASKS.filter((t) => t.isDone === false);
	// const doneTasks = TASKS.filter((t) => t.isDone === true);
	const theLastIncrementIdFromAll = () => {
		const arrT = [...doneTasks, ...notDoneTasks];
		if (arrT.length === 0) return 0;
		return arrT
			.map((task) => task.id)
			.sort()
			.at(-1);
	};

	// console.log('Весь компонент ToDoApp перерисовался');

	const addTaskForm = (event) => {
		if (event) event.preventDefault();

		const newTaskInputElement = document.getElementById('newTaskForm');
		const newTaskText = newTaskInputElement.value.trim();

		if (newTaskText) {
			dispatchNotDoneT({
				type: 'add_task_with_form',
				newTaskObj: {
					id: theLastIncrementIdFromAll() + 1,
					text: newTaskText,
					isDone: false,
				},
			});

			newTaskInputElement.value = '';
		} else alert('Write your task in input area');
	};

	// При изменении задач, обновляем и запись в localStorage
	useEffect(() => {
		localStorage.setItem('arrTasksDone', JSON.stringify(doneTasks));
	}, [doneTasks]);

	useEffect(() => {
		localStorage.setItem('arrTasksNotDone', JSON.stringify(notDoneTasks));
	}, [notDoneTasks]);

	return (
		<div className="to-do-App">
			<h1 className="to-do-App__h1">to-do App</h1>

			{/* controllable input on React START */}
			<div className="to-do-App__Area-Input">
				<input
					id="newTaskReact"
					type="text"
					placeholder="controllable React's input"
					value={newTask}
					onChange={(event) => {
						setNewTask(event.target.value);
					}}
					autoFocus
					spellCheck
				/>
				<button
					disabled={!newTask}
					onClick={() => {
						if (newTask) {
							dispatchNotDoneT({
								type: 'add_task_with_react',
								newTaskObj: {
									id: theLastIncrementIdFromAll() + 1,
									text: newTask,
									isDone: false,
								},
							});

							setNewTask('');
						} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)}
					}}
					className="to-do-App__Add-btn"
				>
					add
				</button>
			</div>
			{/* controllable input on React END */}
			{/* Через форму START */}
			<div id="with_form_tag" className="to-do-App__Area-Input">
				<form
					onSubmit={(e) => {
						addTaskForm(e);
					}}
				>
					<input id="newTaskForm" type="text" placeholder="Form input" />
					<button type="submit" onClick={addTaskForm} className="to-do-App__Add-btn">
						add
					</button>
				</form>
			</div>
			{/* Через форму END */}
			{/* Вывод НЕвыполненных задач START */}
			<ol className="to-do-App__ol">
				{notDoneTasks.length > 0 && <h3> Not Completed</h3>}
				<NotDone
					dispatchNotDoneT={dispatchNotDoneT}
					notDoneTasks={notDoneTasks}
					dispatchDoneT={dispatchDoneT}
					theLastIncrementIdFromAll={theLastIncrementIdFromAll}
				/>
			</ol>
			{/* Вывод НЕвыполненных задач END */}
			{/* Вывод Выполненных задач START */}
			<ol className="to-do-App__ol">
				{doneTasks.length > 0 && <h3>Completed</h3>}

				<Done
					doneTasks={doneTasks}
					dispatchDoneT={dispatchDoneT}
					dispatchNotDoneT={dispatchNotDoneT}
					theLastIncrementIdFromAll={theLastIncrementIdFromAll}
				/>
			</ol>
			{/* Вывод Выполненных задач END */}
		</div>
	);
};

function initTasksFrom(storageName) {
	const savedTasksStr = localStorage.getItem(storageName);
	if (!savedTasksStr) return [];
	try {
		return JSON.parse(savedTasksStr);
	} catch (e) {
		localStorage.removeItem(storageName);
		console.log(e);
		return [];
	}
}
export default Test_2;
