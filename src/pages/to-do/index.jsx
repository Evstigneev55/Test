import { useEffect, useState } from "react";

import './index.css'

const ToDoApp = () => {
  let initArrTasks = [];

  useEffect(() => {
    if (
      localStorage.getItem("arrTasks") !== null &&
      localStorage.getItem("arrTasks") !== "" &&
      localStorage.getItem("arrTasks") !== undefined
    ) {
      const arrTasks = localStorage.getItem("arrTasks") ?? [""];
      initArrTasks = arrTasks.split(",");
    } else {
      localStorage.setItem("arrTasks", "");
    }
  }, []);

  const [tasks, setTasks] = useState(initArrTasks);

  function delTask(index) {
    const newArrTasks = tasks.filter((_, i) => i !== index);
    setTasks(newArrTasks);
  }

  function addTask() {
    const newTaskInputElement = document.getElementById("newTask");
    const newTaskText = newTaskInputElement.value.trim();

    if (newTaskText !== "") setTasks((tasks) => [...tasks, newTaskText]);
    else alert("Write your task in input area");
  }

  // При обновлении задач, обновляем и запись в localStorage
  useEffect(() => {
    localStorage.setItem("arrTasks", tasks);
  }, [tasks]);

  return (
    <div className="to-do-App">
      <h1 className="to-do-App__h1">to-do</h1>

      <div className="to-do-App__Area-Input">
        <input
          id="newTask"
          type="text"
          placeholder="Write your new task here!"
        />
        <button onClick={addTask} className="to-do-App__Add-btn">add</button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button onClick={() => delTask(index)}>delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoApp;
