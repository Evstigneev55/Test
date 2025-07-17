import { useEffect, useState } from 'react';

import './index.css';

const ToDoApp = () => {
	const [tasks, setTasks] = useState(initTasks());
	const [newTask, setNewTask] = useState('');

	console.log('Весь компонент ToDoApp перерисовался');
	
	// Не удаляет, а перезаписывает массив на новый, уже без записи под индексом
	function delTask(index) {
		const newArrTasks = tasks.filter((_, i) => i !== index);
		setTasks(newArrTasks);
	}

	//! useRef() использовать
	//! Попробуй useReducer
	// function reducer(state, action) {
	// }

	// Обновляем state tasks и newTask
	function addTaskWithReact() {
		if (newTask !== '') {
			setTasks((tasks) => [...tasks, newTask]);

			setNewTask((newTask) => {
				newTask = '';
				return newTask;
			});
		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
	}

	function addTaskForm(event) {
		if (event) event.preventDefault();
		console.log(event);

		const newTaskInputElement = document.getElementById('newTaskForm');
		const newTaskText = newTaskInputElement.value.trim();

		if (newTaskText !== '') {
			setTasks((tasks) => [...tasks, newTaskText]);
			newTaskInputElement.value = '';
		} else alert('Write your task in input area');
	}

	// При изменении задач, обновляем и запись в localStorage
	useEffect(() => {
		localStorage.setItem('arrTasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<div className="to-do-App">
			<h1 className="to-do-App__h1">to-do</h1>

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
				<button onClick={addTaskWithReact} className="to-do-App__Add-btn">
					add
				</button>
			</div>
			{/* controllable input on React END */}

			{/* Через форму START */}
			<div id="with_form_tag" className="to-do-App__Area-Input">
				<form onSubmit={addTaskForm}>
					<input id="newTaskForm" type="text" placeholder="Form input" />
					<button type="submit" onClick={addTaskForm} className="to-do-App__Add-btn">
						add
					</button>
				</form>
			</div>
			{/* Через форму END */}

			<ol className="to-do-App__ol">
				{tasks.map((task, index) => (
					<li key={index}>
						<span>{task}</span>
						<button className="del-btn" onClick={() => delTask(index)}>
							delete
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

export default ToDoApp;

//TODO: вынести все задачи в отдельную функцию, чтобы реакт перерисовывал не весь компонент to-do, а только задачи
// function...

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
