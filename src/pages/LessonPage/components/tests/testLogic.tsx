import React, { useReducer, useEffect, useRef } from 'react';

interface ITask {
	id: number;
	text: string;
	isDone: boolean;
}

// type OnlyCasesReducerTasks<T> = {
// 	[K in keyof T]: T[K] extends string ? K : never
// }[keyof T]

type PossibleCasesReducer = 'del_task' | 'add_task' | 'on_Click_Up_Btn' | 'on_Click_Down_Btn';

interface PossibleActionsReducer {
	type: PossibleCasesReducer;
	newTaskObj: ITask;
	TaskId: number;
	index: number;
}

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
	const refLastId = useRef<number>(initLatestId([...doneTasks, ...notDoneTasks]));

	// console.log(typeof(refLastId), "mrmrmrmr", typeof(refLastId.current))
	
	const addTaskForm = (event) => {
		if (event) event.preventDefault();
		
		const newTaskInputElement = document.getElementById('newTaskForm');
		const newTaskText = newTaskInputElement.value.trim();
		
		if (newTaskText) {
			dispatchNotDoneT({
				type: 'add_task',
				newTaskObj: {
					id: refLastId.current++,
					text: newTaskText,
					isDone: false,
				},
			});

			localStorage.setItem('last_id', refLastId.current.toString());

			newTaskInputElement.value = '';
		} else alert('Write your task in input area');
	};

	function addTaskWithReact(newTaskState: string, setNewTaskState: React.Dispatch<React.SetStateAction<string>>) {
		if (newTaskState) {
			dispatchNotDoneT({
				type: 'add_task',
				newTaskObj: { id: refLastId.current++, text: newTaskState, isDone: false },
			});
			localStorage.setItem('last_id', refLastId.current.toString())

			setNewTaskState('');
		} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)
	}

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
		addTaskWithReact,
		addTaskForm,
	};
};

export default useTestDo;

function initLatestId(arrT: ITask[]) {
	const storedLastId = localStorage.getItem('last_id');
	if (!storedLastId) {
		const lastId =
			arrT
				.map((task) => task.id)
				.sort()
				?.at(-1) ?? 0;
		localStorage.setItem('last_id', lastId.toString());
		return lastId;
	}
	try {
		return Number(JSON.parse(storedLastId));
	} catch (e) {
		console.log('Cant parse to Num: ' + storedLastId, '\n by Error: ' + e);
		localStorage.removeItem('last_id');
		return 500;
	}
}
// добавить возможность получать theLatestId (думаю с дженериком можно как-то)
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
