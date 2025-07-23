// function Done({ name }) {}

function NotDone({ notDoneTasks, checkboxHandler, delTask, onClickUpBtn, onClickDownBtn }) {
	return notDoneTasks.map((task, index) => (
		<li key={task.id}>
			<input
				type="checkbox"
				checked={task.isDone}
				onChange={(e) => {
					checkboxHandler(e, task);
				}}
			/>
			<span>{task.text}</span>
			<button className="del-btn" onClick={() => delTask(index)}>
				delete
			</button>
			<button type="button" onClick={() => onClickUpBtn(index)}>
				up
			</button>
			<button type="button" onClick={() => onClickDownBtn(index)}>
				down
			</button>
		</li>
	));
}

export default NotDone;
