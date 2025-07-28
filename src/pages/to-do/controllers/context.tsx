import { useReducer, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';

import useToDoLogic from './logic';

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

interface TodoContext {
	doneTasks: ITask[];
	notDoneTasks: ITask[];
	dispatchDoneT: React.ActionDispatch<[action: ActionsPayload]>;
	dispatchNotDoneT: React.ActionDispatch<[action: ActionsPayload]>;
	addTaskWithReact: (newTaskState: string) => void;
}

export const TodoContext = createContext<TodoContext>({
	doneTasks: [],
	notDoneTasks: [],
	dispatchDoneT: () => {},
	dispatchNotDoneT: () => {},
	addTaskWithReact: () => {},
});

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
	const { doneTasks, dispatchDoneT, notDoneTasks, dispatchNotDoneT, addTaskWithReact } = useToDoLogic();

	return (
		<TodoContext.Provider
			value={{
				doneTasks: doneTasks,
				notDoneTasks: notDoneTasks,
				dispatchDoneT: dispatchDoneT,
				dispatchNotDoneT: dispatchNotDoneT,
				addTaskWithReact: addTaskWithReact,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;

function reducerTasks(prevTasks: ITask[], action: ActionsPayload): ITask[] {
	let tasks = [...prevTasks];

	switch (action.type) {
		case 'del-task': {
			tasks = prevTasks.filter((ta) => ta.id !== action.taskId);
			break;
		}
		case 'add-task': {
			tasks.push(action.newTaskObj);
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
