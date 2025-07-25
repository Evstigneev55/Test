//TODO start
// - Read docs React fully
// - вынести все задачи в отдельную функцию, чтобы реакт перерисовывал не весь компонент to-do, а только задачи:
//export function...
//TODO end

//! tasks:
//- .prettierc (120 length)
//- useReduce
//- refactor with TS
//- make Route for tests

import './index.css';

import useTodo from './components/logic.jsx';
import NotDone from './components/NotDone.jsx';
import Done from './components/Done.jsx';
import NothingIntersting from './components/secret.jsx';

//- useReduce (вынести всю логику в отдельный useTodo хук, и потом деструктуризацией добавить в основной)
//-
const ToDoApp = () => {
	const {
		tasks,
		newTask,
		notDoneTasks,
		doneTasks,
		delTask,
		addTaskWithReact,
		addTaskForm,
		onClickUpBtn,
		retarded,
		checkboxHandler,
		setNewTask,
	} = useTodo();

	return (
		<div className="to-do-App">
			<NothingIntersting />

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
				<button disabled={!newTask} onClick={addTaskWithReact} className="to-do-App__Add-btn">
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
					notDoneTasks={notDoneTasks}
					checkboxHandler={checkboxHandler}
					delTask={delTask}
					onClickUpBtn={onClickUpBtn}
					onClickDownBtn={retarded}
				/>
			</ol>
			{/* Вывод НЕвыполненных задач END */}

			{/* Вывод Выполненных задач START */}
			<ol className="to-do-App__ol">
				{doneTasks.length > 0 && <h3>Completed</h3>}

				<Done doneTasks={doneTasks} checkboxHandler={checkboxHandler} delTask={delTask} />
			</ol>
			{/* Вывод Выполненных задач END */}
		</div>
	);
};

export default ToDoApp;

// interface ITask {
// 	id: number;
// 	text: string;
// 	isDone: boolean;
// }

// eslint-disable-next-line no-unused-vars
const exampInitTasks = [
	{ id: 0, text: 'lyaLyaLya', isDone: false },
	{ id: 1, text: 'OpLa', isDone: false },
	{ id: 2, text: 'L?', isDone: true },
];
