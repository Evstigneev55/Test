import { useReducer, useState, useEffect } from 'react';
import Done from '../../../to-do/components/Done';
import NotDone from '../../../to-do/components/NotDone';

function reducerTasks(t, action) {
	switch (action.type) {
		case 'del_task':
			const newArrTasks = t.filter((_, i) => i !== action.index);
			return newArrTasks;

		case 'add_task_with_react':
			return [...t, action.newTaskObj];

		case 'add_task_with_form':
			return [...t, action.newTaskObj];

		case 'on-click-up-btn':
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
			return newTasksArr;
	}
}

const Test_1 = () => {
	const [TASKS, dispatch] = useReducer(reducerTasks, initTasks()); //! doesn`t work
	const [newTask, setNewTask] = useState('');
	const notDoneTasks = TASKS.filter((t) => t.isDone === false);
	const doneTasks = TASKS.filter((t) => t.isDone === true);
	const theLastIncrementId =
		TASKS.length === 0
			? 0
			: TASKS.map((task) => task.id)
					.sort()
					.at(-1);

	console.log('Весь компонент ToDoApp перерисовался');

	// Не удаляет, а перезаписывает массив на новый, уже без записи под индексом
	function delTask(index) {
		dispatch({ type: 'del_task', index: index });
	}

	//
	function addTaskWithReact() {
		if (newTask) {
			dispatch({
				type: 'add_task_with_react',
				newTaskObj: { id: theLastIncrementId + 1, text: newTask, isDone: false },
			});

			setNewTask('');
		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
	}

	const addTaskForm = (event) => {
		if (event) event.preventDefault();

		const newTaskInputElement = document.getElementById('newTaskForm');
		const newTaskText = newTaskInputElement.value.trim();

		if (newTaskText) {
			dispatch({
				type: 'add_task_with_form',
				newTaskObj: { id: theLastIncrementId + 1, text: newTaskText, isDone: false },
			});

			newTaskInputElement.value = '';
		} else alert('Write your task in input area');
	};

	function onClickUpBtn(index) {
		if (index < 1) return;
		dispatch({ type: 'on-click-up-btn', index: index });
	}

	function onClickDownBtn(index) {
		if (index === TASKS.length - 1) return;
		dispatch({ type: 'on_Click_Down_Btn', index: index });
	}

	function checkboxHandler(e, task) {
		dispatch({ type: 'click_checkbox', task: task, e: e });
	}

	// При изменении задач, обновляем и запись в localStorage
	useEffect(() => {
		localStorage.setItem('arrTasks', JSON.stringify(TASKS));
	}, [TASKS]);

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
				<button disabled={!newTask} onClick={addTaskWithReact} className="to-do-App__Add-btn">
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
					notDoneTasks={notDoneTasks}
					checkboxHandler={checkboxHandler}
					delTask={delTask}
					onClickUpBtn={onClickUpBtn}
					onClickDownBtn={onClickDownBtn}
				/>
			</ol>
			{/* Вывод НЕвыполненных задач END */}

			{/* Вывод Выполненных задач START */}
			<ol className="to-do-App__ol">
				{doneTasks.length > 0 && <h3>Completed</h3>}

				<Done doneTasks={doneTasks} checkboxHandler={checkboxHandler} delTask={delTask} />
			</ol>
			{/* Вывод Выполненных задач END */}
		</div>
	);
};

function initTasks() {
	const savedTasksStr = localStorage.getItem('arrTasks');
	if (!savedTasksStr) return [];
	try {
		return JSON.parse(savedTasksStr);
	} catch (e) {
		localStorage.removeItem('arrTasks');
		console.log(e);
		return [];
	}
}

export default Test_1;
