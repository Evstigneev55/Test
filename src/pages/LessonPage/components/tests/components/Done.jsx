function Done({ doneTasks, dispatchDoneT, dispatchNotDoneT, theLastIncrementIdFromAll }) {
	return doneTasks.map((task, index) => (
		<li key={task.id}>
			<input
				type="checkbox"
				checked={task.isDone}
				onChange={(e) => {
					dispatchDoneT({
						type: 'click_checkbox',
						task: task,
						e: e,
						dispatchNotDoneT: dispatchNotDoneT,
						theLastIncrementIdFromAll: theLastIncrementIdFromAll,
					});
				}}
			/>
			<span>{task.text}</span>
			<button className="del-btn" onClick={() => dispatchDoneT({ type: 'del_task', index: index })}>
				delete
			</button>
		</li>
	));
}

export default Done;
