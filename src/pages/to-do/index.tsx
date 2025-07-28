import './index.css';

import NothingIntersting from './components/secret.jsx';
import ControllableInput from './components/ControllableInput.jsx';
import NotDone from './components/NotDone.jsx';
import Done from './components/Done.jsx';

const ToDoApp = () => {
	return (
		<div className="to-do-App">
			<NothingIntersting />
			<h1 className="to-do-App__h1">to-do App</h1>

			<ControllableInput />
			<NotDone />
			<Done />
		</div>
	);
};

export default ToDoApp;
