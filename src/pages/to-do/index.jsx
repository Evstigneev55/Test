//TODO start
// - Read docs React fully
// - вынести все задачи в отдельную функцию, чтобы реакт перерисовывал не весь компонент to-do, а только задачи:
//export function...
//TODO end

import './index.css';

import NothingIntersting from './components/secret.jsx';
import Done from './components/Done.jsx';
import NotDone from './components/NotDone.jsx';
import ControllableInput from './components/ControllableInput.jsx';

import useToDoLogic from './components/logic.js';

const ToDoApp = () => {
	const { doneTasks, dispatchDoneT, notDoneTasks, dispatchNotDoneT, addTaskForm, addTaskWithReact } = useToDoLogic();

	return (
		<div className="to-do-App">
			<NothingIntersting />
			<h1 className="to-do-App__h1">to-do App</h1>

			<ControllableInput addTaskWithReact={addTaskWithReact} />

			{/* Через форму START */}
			<div id="with_form_tag" className="to-do-App__Area-Input">
				<form onSubmit={addTaskForm}>
					<input id="newTaskForm" type="text" placeholder="Form input" />
					<button type="submit" className="to-do-App__Add-btn">
						add
					</button>
				</form>
			</div>
			{/* Через форму END */}

			<NotDone dispatchNotDoneT={dispatchNotDoneT} notDoneTasks={notDoneTasks} dispatchDoneT={dispatchDoneT} />

			<Done doneTasks={doneTasks} dispatchDoneT={dispatchDoneT} dispatchNotDoneT={dispatchNotDoneT} />
		</div>
	);
};

export default ToDoApp;
