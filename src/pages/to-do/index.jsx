import './index.css';

import NothingIntersting from './components/secret.jsx';
import Done from './components/Done.jsx';
import NotDone from './components/NotDone.jsx';
import ControllableInput from './components/ControllableInput.jsx';

import useToDoLogic from './components/logic.js';

const ToDoApp = () => {
	const { doneTasks, dispatchDoneT, notDoneTasks, dispatchNotDoneT, addTaskWithReact } = useToDoLogic();

	return (
		<div className="to-do-App">
			<NothingIntersting />
			<h1 className="to-do-App__h1">to-do App</h1>

			<ControllableInput addTaskWithReact={addTaskWithReact} />

			<NotDone dispatchNotDoneT={dispatchNotDoneT} notDoneTasks={notDoneTasks} dispatchDoneT={dispatchDoneT} />

			<Done doneTasks={doneTasks} dispatchDoneT={dispatchDoneT} dispatchNotDoneT={dispatchNotDoneT} />
		</div>
	);
};

export default ToDoApp;
