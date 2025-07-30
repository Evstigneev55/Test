import { createContext, useContext } from 'react';

import useToDoLogic, { type ITask, type ActionsPayload } from './logic';

interface TodoContext {
	doneTasks: ITask[];
	notDoneTasks: ITask[];
	dispatchDoneT: React.ActionDispatch<[action: ActionsPayload]>;
	dispatchNotDoneT: React.ActionDispatch<[action: ActionsPayload]>;
	addTaskWithReact: (newTaskState: string) => void;
}

const TodoContext = createContext<TodoContext>({
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
export const subTodoContext = () => useContext(TodoContext);
