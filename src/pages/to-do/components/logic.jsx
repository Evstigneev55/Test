import { useState, useEffect, useReducer } from 'react';

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
			return newTasksArr;
	}
}
const useToDo = () => {
    const [TASKS, dispatch] = useReducer(reducerTasks, initTasks())
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
        const newArrTasks = tasks.filter((_, i) => i !== index)
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
