function Done({ doneTasks, dispatchDoneT, dispatchNotDoneT }) {
	return (
		<ol className="to-do-App__ol">
			{doneTasks.length > 0 && <h3>Completed</h3>}

			{doneTasks.map((task, index) => (
				<li key={task.id}>
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={() => {
							dispatchDoneT({
								type: 'del_task',
								TaskId: task.id,
							});
							dispatchNotDoneT({
								type: 'add_task',
								newTaskObj: { ...task, isDone: false },
							});
						}}
					/>
					<span>{task.text}</span>
					<button
						className="del-btn"
						onClick={() => dispatchDoneT({ type: 'del_task', TaskId: task.id })}
					>
						delete
					</button>
				</li>
			))}
		</ol>
	);
}

export default Done;
