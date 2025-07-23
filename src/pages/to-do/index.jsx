//TODO start
// - Read docs React fully
// - do str: 25-26
// - вынести все задачи в отдельную функцию, чтобы реакт перерисовывал не весь компонент to-do, а только задачи:
//export function...
// - Fixme, str: 21
//TODO end

import { useEffect, useState } from 'react';

import './index.css';

import NotDone from './components/NotDone.jsx';
import Done from './components/Done.jsx';
import NothingIntersting from './components/secret.jsx';

const ToDoApp = () => {
	const [tasks, setTasks] = useState(initTasks());
	const [newTask, setNewTask] = useState('');
	const notDoneTasks = tasks.filter((t) => t.isDone === false);
	const doneTasks = tasks.filter((t) => t.isDone === true);
	const theLastIncrementId =
		tasks.length === 0
			? 0
			: tasks
					.map((task) => task.id)
					.sort()
					.at(-1);

	console.log('Весь компонент ToDoApp перерисовался');

	// Не удаляет, а перезаписывает массив на новый, уже без записи под индексом
	function delTask(index) {
		const newArrTasks = tasks.filter((_, i) => i !== index);
		console.log(index, newArrTasks);
		setTasks(() => newArrTasks);
	}

	//
	function addTaskWithReact() {
		if (newTask !== '') {
			setTasks((tasks) => {
				const newTasksArr = [...tasks];
				newTasksArr.push({ id: theLastIncrementId + 1, text: newTask, isDone: false });

				return newTasksArr;
			});

			setNewTask((newTask) => {
				newTask = '';
				return newTask;
			});
		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
	}

	function addTaskForm(event) {
		if (event) event.preventDefault();

		const newTaskInputElement = document.getElementById('newTaskForm');
		const newTaskText = newTaskInputElement.value.trim();

		if (newTaskText !== '') {
			setTasks((tasks) => {
				const newTasksArr = [...tasks];
				newTasksArr.push({ id: theLastIncrementId + 1, text: newTaskText, isDone: false });

				return newTasksArr;
			});
			newTaskInputElement.value = '';
		} else alert('Write your task in input area');
	}

	function onClickUpBtn(index) {
		if (index < 1) return;

		setTasks((t) => {
			const updatedTasks = [...t];
			[updatedTasks[index - 1], updatedTasks[index]] = [
				updatedTasks[index],
				updatedTasks[index - 1],
			];
			return updatedTasks;
		});
	}

	function retarded(index) {
		if (index === tasks.length - 1) return;
		setTasks((t) => {
			const updatedTasks = [...t];
			[updatedTasks[index], updatedTasks[index + 1]] = [
				updatedTasks[index + 1],
				updatedTasks[index],
			];
			return updatedTasks;
		});
	}

	function checkboxHandler(e, task) {
		setTasks((tasks) => {
			const newTasksArr = [...tasks];
			newTasksArr.find((t) => t.id === task.id).isDone = e.target.checked;
			return newTasksArr;
		});
	}

	// При изменении задач, обновляем и запись в localStorage
	useEffect(() => {
		localStorage.setItem('arrTasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<div className="to-do-App">
			<NothingIntersting />

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

			{/* Вывод НЕвыполненных задач START */}
			<ol className="to-do-App__ol">
				{notDoneTasks.length > 0 && <h3> Not Completed</h3>}
				<NotDone
					notDoneTasks={notDoneTasks}
					checkboxHandler={checkboxHandler}
					delTask={delTask}
					onClickUpBtn={onClickUpBtn}
					onClickDownBtn={retarded}
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

export default ToDoApp;

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

// eslint-disable-next-line no-unused-vars
const exampInitTasks = [
	{ id: 0, text: 'lyaLyaLya', isDone: false },
	{ id: 1, text: 'OpLa', isDone: false },
	{ id: 2, text: 'L?', isDone: true },
];
