import React, { useReducer, useEffect } from 'react';
import { nanoid } from 'nanoid';


export interface ITask {
	id: string;
	text: string;
	isDone: boolean;
}

export type ActionsPayload =
	| { type: 'del_task'; TaskId: string }
	| { type: 'add_task'; newTaskObj: ITask }
	| { type: 'on_Click_Up_Btn'; index: number }
	| { type: 'on_Click_Down_Btn'; index: number };

function reducerTasks(t: ITask[], action: ActionsPayload): ITask[] {
	switch (action.type) {
		case 'del_task':
			return t.filter((ta) => ta.id !== action.TaskId);

		case 'add_task':
			return [...t, action.newTaskObj];

		case 'on_Click_Up_Btn': {
			const updatedTasksUp = [...t];
			[updatedTasksUp[action.index - 1], updatedTasksUp[action.index]] = [
				updatedTasksUp[action.index],
				updatedTasksUp[action.index - 1],
			];
			return updatedTasksUp;
		}

		case 'on_Click_Down_Btn': {
			const updatedTasksDown = [...t];
			[updatedTasksDown[action.index], updatedTasksDown[action.index + 1]] = [
				updatedTasksDown[action.index + 1],
				updatedTasksDown[action.index],
			];
			return updatedTasksDown;
		}

		default:
			throw Error('Unknown action: ' + (action as any).type);
	}
}

const useToDoLogic = () => {
	const [doneTasks, dispatchDoneT] = useReducer(reducerTasks, initTasksFrom('arrTasksDone'));
	const [notDoneTasks, dispatchNotDoneT] = useReducer(reducerTasks, initTasksFrom('arrTasksNotDone'));

	function addTaskWithReact(newTaskState: string, setNewTaskState: React.Dispatch<React.SetStateAction<string>>) {
		if (newTaskState) {
			dispatchNotDoneT({
				type: 'add_task',
				newTaskObj: { id: nanoid(), text: newTaskState, isDone: false },
			});

			setNewTaskState('');
		} else alert('Write your task in input area');
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
	};
};

export default useToDoLogic;

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
