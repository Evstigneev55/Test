import { useState, useEffect } from 'react';

const useToDo = () => {
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
		setTasks(() => newArrTasks);
	}

	//
	function addTaskWithReact() {
		if (newTask) {
			setTasks((tasks) => [...tasks, { id: theLastIncrementId + 1, text: newTask, isDone: false }]);

			setNewTask('');
		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
	}

	const addTaskForm = (event) => {
		if (event) event.preventDefault();

		const newTaskInputElement = document.getElementById('newTaskForm');
		const newTaskText = newTaskInputElement.value.trim();

		if (newTaskText) {
			setTasks((tasks) => {
				const newTasksArr = [...tasks];
				newTasksArr.push({ id: theLastIncrementId + 1, text: newTaskText, isDone: false });

				return newTasksArr;
			});
			newTaskInputElement.value = '';
		} else alert('Write your task in input area');
	};

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

	return {
		tasks,
		newTask,
		notDoneTasks,
		doneTasks,
		delTask,
		addTaskWithReact,
		addTaskForm,
		onClickUpBtn,
		retarded,
		checkboxHandler,
		setNewTask,
	};
};

export default useToDo;

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
