function Done({ doneTasks, checkboxHandler, delTask }) {
	return doneTasks.map((task, index) => (
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
					</li>
				))
}

export default Done;
