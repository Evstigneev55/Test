import { subTodoContext } from 'controllers/context';

function Done() {
	const { dispatchDoneT, doneTasks, dispatchNotDoneT } = subTodoContext();

	return (
		<ol className="to-do-App__ol">
			{doneTasks.length > 0 && <h3>Completed</h3>}

			{doneTasks.map((task) => (
				<li key={task.id}>
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={() => {
							dispatchDoneT({
								type: 'del-task',
								taskId: task.id,
							});
							dispatchNotDoneT({
								type: 'add-task',
								newTaskObj: { ...task, isDone: false },
							});
						}}
					/>
					<span>{task.text}</span>
					<button className="del-btn" onClick={() => dispatchDoneT({ type: 'del-task', taskId: task.id })}>
						delete
					</button>
				</li>
			))}
		</ol>
	);
}

export default Done;
