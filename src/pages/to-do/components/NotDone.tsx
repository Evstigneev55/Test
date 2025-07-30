import { subTodoContext } from 'controllers/context';

function NotDone() {
	const { dispatchNotDoneT, notDoneTasks, dispatchDoneT } = subTodoContext();

	return (
		<ol className="to-do-App__ol">
			{notDoneTasks.length > 0 && <h3> Not Completed</h3>}

			{notDoneTasks.map((task, index) => (
				<li key={task.id}>
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={() => {
							dispatchNotDoneT({ type: 'del-task', taskId: task.id });
							dispatchDoneT({ type: 'add-task', newTaskObj: { ...task, isDone: true } });
						}}
					/>

					<span>{task.text}</span>

					<button className="del-btn" onClick={() => dispatchNotDoneT({ type: 'del-task', taskId: task.id })}>
						delete
					</button>
					<button
						type="button"
						disabled={index < 1}
						onClick={() => {
							if (index < 1) return;
							dispatchNotDoneT({ type: 'on-click-up-btn', index: index });
						}}
					>
						up
					</button>
					<button
						type="button"
						disabled={index >= notDoneTasks.length - 1}
						onClick={() => {
							if (index === notDoneTasks.length - 1) return;
							dispatchNotDoneT({ type: 'on-click-down-btn', index: index });
						}}
					>
						down
					</button>
				</li>
			))}
		</ol>
	);
}

export default NotDone;
