const ToDoApp = () => {
  function addTask() {
    const newTaskInputElement = document.getElementById("newTaskInput");
    const newTaskText = newTaskInputElement.value;

    let lastIndex = localStorage.getItem("lastTaskIndex") ?? 0;

    lastIndex++;

    localStorage.setItem(lastIndex, newTaskText);

    localStorage.setItem("lastTaskIndex", lastIndex);
  }
  function delTask() {}
  function showTasks(tasksFromStorage) {}

  return (
    <>
      <h1>Your tasks list</h1>
      <input
        id="newTaskInput"
        type="text"
        placeholder="Write your new task here!"
      />
      <button onClick={addTask}>Add task</button>
    </>
  );
};

// Циклом вывести все задачи, что есть в localStorage
//

export default ToDoApp;
