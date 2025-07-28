import './styles/index.css'

import ClickMe from 'components/EasterEgg';
import TodoContextProvider from 'controllers/context';
import ControllableInput from 'components/ControllableInput';
import NotDone from 'components/NotDone';
import Done from 'components/Done';

const ToDoApp = () => {
	return (
		<div className="to-do-App">
			<ClickMe />
			<h1 className="to-do-App__h1">to-do App</h1>

			<TodoContextProvider>
				<ControllableInput />
				<NotDone />
				<Done />
			</TodoContextProvider>
		</div>
	);
};

export default ToDoApp;
