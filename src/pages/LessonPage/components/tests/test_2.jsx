import Done from './components/Done.jsx';
import NotDone from './components/NotDone.jsx';
import ControllableInput from './components/ControllableInput.jsx';
import useTestDo from './testLogic.tsx';

const Test_2 = () => {
	const {
		doneTasks,
		dispatchDoneT,
		notDoneTasks,
		dispatchNotDoneT,
		theLastIncrementIdFromAll,
		addTaskForm,
	} = useTestDo();

	return (
		<div className="to-do-App">
			<h1 className="to-do-App__h1">to-do App</h1>

			<ControllableInput
				theLastIncrementIdFromAll={theLastIncrementIdFromAll}
				dispatchNotDoneT={dispatchNotDoneT}
				dispatchDoneT={dispatchDoneT}
			/>

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

			<NotDone
				dispatchNotDoneT={dispatchNotDoneT}
				notDoneTasks={notDoneTasks}
				dispatchDoneT={dispatchDoneT}
			/>

			<Done
				doneTasks={doneTasks}
				dispatchDoneT={dispatchDoneT}
				dispatchNotDoneT={dispatchNotDoneT}
			/>
		</div>
	);
};

export default Test_2;
