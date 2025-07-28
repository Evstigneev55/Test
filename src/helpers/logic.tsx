import { useReducer, useEffect } from 'react';
import { nanoid } from 'nanoid';

export interface ITask {
	id: string;
	text: string;
	isDone: boolean;
}

export type ActionsPayload =
	| { type: 'del-task'; taskId: string }
	| { type: 'add-task'; newTaskObj: ITask }
	| { type: 'on-click-up-btn'; index: number }
	| { type: 'on-click-down-btn'; index: number };

function reducerTasks(prevTasks: ITask[], action: ActionsPayload): ITask[] {
	let tasks = [...prevTasks];
	
	switch (action.type) {
		case 'del-task': {
			tasks = prevTasks.filter((ta) => ta.id !== action.taskId);
			break;
		}
		case 'add-task': {
			tasks.push(action.newTaskObj)
			break;
		}
		case 'on-click-up-btn': {
			[tasks[action.index - 1], tasks[action.index]] = [tasks[action.index], tasks[action.index - 1]];
			break;
		}

		case 'on-click-down-btn': {
			[tasks[action.index], tasks[action.index + 1]] = [tasks[action.index + 1], tasks[action.index]];
			break;
		}
		default:
			throw Error('Unknown action: ' + (action as any).type);
	}
	return tasks;
}

const useToDoLogic = () => {
	const [doneTasks, dispatchDoneT] = useReducer(reducerTasks, [], () => initTasksFrom('arrTasksDone'));
	const [notDoneTasks, dispatchNotDoneT] = useReducer(reducerTasks, [], () => initTasksFrom('arrTasksNotDone'));

	function addTaskWithReact(newTaskState: string) {
		if (newTaskState) {
			dispatchNotDoneT({
				type: 'add-task',
				newTaskObj: { id: nanoid(), text: newTaskState, isDone: false },
			});
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
