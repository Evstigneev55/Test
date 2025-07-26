import { useReducer, useState, useEffect } from 'react';

interface ITask {
	id: number;
	text: string;
	isDone: boolean;
}

// type OnlyCasesReducerTasks<T> = {
// 	[K in keyof T]: T[K] extends string ? K : never
// }[keyof T]

type PossibleCasesReducer =
	| 'del_task'
	| 'add_task'
	| 'on_Click_Up_Btn'
	| 'on_Click_Down_Btn'
	| 'click_checkbox';

function reducerTasks(t: ITask[], action: any): ITask[] {
	switch (action.type) {
		case 'del_task':
			return t.filter((ta) => ta.id !== action.TaskId);

		case 'add_task':
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
	}
	throw Error('Unknown action: ' + action.type);
}

const useTestDo = () => {
	const [doneTasks, dispatchDoneT] = useReducer(reducerTasks, initTasksFrom('arrTasksDone'));
	const [notDoneTasks, dispatchNotDoneT] = useReducer(
		reducerTasks,
		initTasksFrom('arrTasksNotDone')
	);

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
				type: 'add_task',
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
		theLastIncrementIdFromAll,
		addTaskForm,
	};
};

export default useTestDo;

function initTasksFrom(storageName: 'arrTasksDone' | 'arrTasksNotDone') {
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
