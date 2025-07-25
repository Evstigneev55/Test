import { useReducer, useState, useEffect } from 'react';

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

const useTestDo = () => {
	const [doneTasks, dispatchDoneT] = useReducer(reducerTasks, initTasksFrom('arrTasksDone'));
	const [notDoneTasks, dispatchNotDoneT] = useReducer(
		reducerTasks,
		initTasksFrom('arrTasksNotDone')
	);
	const [newTask, setNewTask] = useState('');

	const theLastIncrementIdFromAll = () => {
		const arrT = [...doneTasks, ...notDoneTasks];
		if (arrT.length === 0) return 0;
		return arrT
			.map((task) => task.id)
			.sort()
			.at(-1);
	};

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

		// При изменении задач, обновляем запись в localStorage
	useEffect(() => {
		localStorage.setItem('arrTasksDone', JSON.stringify(doneTasks));
	}, [doneTasks]);

	useEffect(() => {
		localStorage.setItem('arrTasksNotDone', JSON.stringify(notDoneTasks));
	}, [notDoneTasks]);

	return {
		doneTasks,
		dispatchDoneT,
		notDoneTasks,
		dispatchNotDoneT,
		newTask,
		setNewTask,
		theLastIncrementIdFromAll,
		addTaskForm,
	};
};

export default useTestDo;

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
