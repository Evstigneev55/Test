import React, { createContext, type PropsWithChildren, useContext, useReducer } from 'react';
import { nanoid } from 'nanoid';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage.ts';

/**
 * Короче, непоню откуда я решил, что типы в экшоне должны быть капсом. Возможно, когда Redux использовали. Ты его потом попробуешь
 * В общем, нормально использовать и маленькими буквами, но кебаб кейсом
 *
 * еще увидел в доке реакта пример для туду на useReducer - https://react.dev/reference/react/useReducer#todo-list-array
 * */

export interface ITask {
	id: string;
	text: string;
	isDone: boolean;
}

interface ITodosState {
	done: Array<ITask>;
	todo: Array<ITask>;
}

interface ITodoContext extends ITodosState {
	addTask: (val: string) => void;
	removeTask: (task: ITask) => void;
	toggleDone: (val: ITask) => void;
	move: (payload: ITask, direction: 'up' | 'down') => void;
}

const STORAGE_KEY = 'todo_store';

export type ActionsPayload =
	| { type: 'DEL_TASK'; payload: ITask }
	| { type: 'ADD_TASK'; payload: string }
	| { type: 'CHECK'; payload: string }
	| { type: 'UNCHECK'; payload: string }
	| { type: 'MOVE_UP'; payload: ITask }
	| { type: 'MOVE_DOWN'; payload: ITask };

function reducerTasks(oldState: ITodosState, action: ActionsPayload): ITodosState {
	const state = { ...oldState };

	switch (action.type) {
		case 'ADD_TASK': {
			state.todo = [...state.todo, { id: nanoid(), isDone: false, text: action.payload }];
			break;
		}

		case 'DEL_TASK': {
			if (action.payload.isDone) {
				state.done = state.done.filter((task) => task.id !== action.payload.id);
			} else {
				state.todo = state.todo.filter((task) => task.id !== action.payload.id);
			}
			break;
		}

		case 'CHECK': {
			const task = state.todo.find((el) => el.id === action.payload);
			if (!task) return state;

			state.done = [{ ...task, isDone: true }, ...state.done];
			state.todo = state.todo.filter((el) => el.id !== action.payload);

			break;
		}

		case 'UNCHECK': {
			const task = state.done.find((el) => el.id === action.payload);
			if (!task) return state;

			state.todo = [...state.todo, { ...task, isDone: false }];
			state.done = state.done.filter((el) => el.id !== action.payload);

			break;
		}

		case 'MOVE_UP': {
			if (action.payload.isDone) {
				state.done = swapTodos(state.done, action.payload, 'up');
			} else {
				state.todo = swapTodos(state.todo, action.payload, 'up');
			}

			break;
		}

		case 'MOVE_DOWN': {
			if (action.payload.isDone) {
				state.done = swapTodos(state.done, action.payload, 'down');
			} else {
				state.todo = swapTodos(state.todo, action.payload, 'down');
			}

			break;
		}
	}

	setToLocalStorage(STORAGE_KEY, state);
	return state;
}

const TodoContext = createContext<ITodoContext>({
	todo: [],
	done: [],
	addTask: () => void 0,
	move: () => void 0,
	removeTask: () => void 0,
	toggleDone: () => void 0,
});

const TodoContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(
		reducerTasks,
		getFromLocalStorage<ITodosState>(STORAGE_KEY, { done: [], todo: [] })
	);

	const addTask: ITodoContext['addTask'] = (val) => {
		dispatch({ type: 'ADD_TASK', payload: val });
	};

	const removeTask: ITodoContext['removeTask'] = (payload) => {
		dispatch({ type: 'DEL_TASK', payload });
	};

	const toggleDone: ITodoContext['toggleDone'] = (val) => {
		dispatch({ type: val.isDone ? 'UNCHECK' : 'CHECK', payload: val.id });
	};

	const move: ITodoContext['move'] = (payload, direction) => {
		dispatch({ type: direction === 'up' ? 'MOVE_UP' : 'MOVE_DOWN', payload });
	};

	return (
		<TodoContext.Provider value={{ todo: state.todo, done: state.done, addTask, removeTask, toggleDone, move }}>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodo = () => useContext(TodoContext);
export default TodoContextProvider;

// ===================== helper =========================
function swapTodos(state: ITask[], task: ITask, direction: 'up' | 'down') {
	const idx = state.findIndex((el) => el.id === task.id);

	/**
	 * do nothing if task not found
	 * if direction UP and task is at the top
	 * if direction DOWN and task is at the bottom
	 * */
	if (idx === -1 || (direction === 'up' && idx === 0) || (direction === 'down' && idx === state.length - 1)) {
		return state;
	}

	const copy = [...state];

	switch (direction) {
		case 'up':
			[copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
			break;
		case 'down':
			[copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
			break;
	}

	return copy;
}
