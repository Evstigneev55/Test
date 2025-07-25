import { useEffect } from 'react';

import Done from './components/Done';
import NotDone from './components/NotDone';
import useTestDo from './testLogic';

const Test_2 = () => {
	const {
		doneTasks,
		dispatchDoneT,
		notDoneTasks,
		dispatchNotDoneT,
		newTask,
		setNewTask,
		theLastIncrementIdFromAll,
		addTaskForm,
	} = useTestDo();
	


	return (
		<div className="to-do-App">
			<h1 className="to-do-App__h1">to-do App</h1>

			{/* controllable input on React START */}
			<div className="to-do-App__Area-Input">
				<input
					id="newTaskReact"
					type="text"
					placeholder="controllable React's input"
					value={newTask}
					onChange={(event) => {
						setNewTask(event.target.value);
					}}
					autoFocus
					spellCheck
				/>
				<button
					disabled={!newTask}
					onClick={() => {
						if (newTask) {
							dispatchNotDoneT({
								type: 'add_task_with_react',
								newTaskObj: {
									id: theLastIncrementIdFromAll() + 1,
									text: newTask,
									isDone: false,
								},
							});

							setNewTask('');
						} else alert('Write your task in input area'); //FIXME: сделать не алерт, а сообщением о ошибке(html в помощь)}
					}}
					className="to-do-App__Add-btn"
				>
					add
				</button>
			</div>
			{/* controllable input on React END */}
			{/* Через форму START */}
			<div id="with_form_tag" className="to-do-App__Area-Input">
				<form
					onSubmit={(e) => {
						addTaskForm(e);
					}}
				>
					<input id="newTaskForm" type="text" placeholder="Form input" />
					<button type="submit" onClick={addTaskForm} className="to-do-App__Add-btn">
						add
					</button>
				</form>
			</div>
			{/* Через форму END */}
			{/* Вывод НЕвыполненных задач START */}
			<ol className="to-do-App__ol">
				{notDoneTasks.length > 0 && <h3> Not Completed</h3>}
				<NotDone
					dispatchNotDoneT={dispatchNotDoneT}
					notDoneTasks={notDoneTasks}
					dispatchDoneT={dispatchDoneT}
					theLastIncrementIdFromAll={theLastIncrementIdFromAll}
				/>
			</ol>
			{/* Вывод НЕвыполненных задач END */}
			{/* Вывод Выполненных задач START */}
			<ol className="to-do-App__ol">
				{doneTasks.length > 0 && <h3>Completed</h3>}

				<Done
					doneTasks={doneTasks}
					dispatchDoneT={dispatchDoneT}
					dispatchNotDoneT={dispatchNotDoneT}
					theLastIncrementIdFromAll={theLastIncrementIdFromAll}
				/>
			</ol>
			{/* Вывод Выполненных задач END */}
		</div>
	);
};

export default Test_2;
