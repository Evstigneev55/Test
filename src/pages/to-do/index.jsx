import { useEffect, useState } from "react";

import "./index.css";

let initArrTasks = [];

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    
    //? Заменить условия ниже на if(localStorage.getItem)
    
    if (
      localStorage.getItem("arrTasks") !== null &&
      localStorage.getItem("arrTasks") !== "" && 
      localStorage.getItem("arrTasks") !== undefined
    ) {
      const arrTasks = localStorage.getItem("arrTasks");
      initArrTasks = arrTasks.split(",");
      console.log("Eсть записи в localStorage");
      setTasks(initArrTasks);
    } else {
      localStorage.setItem("arrTasks", "");
      console.log("Нет записей в localStorage");
    }
  }, []);

  // Не удаляет, а перезаписывает массив на новый, уже без записи под индексом
  function delTask(index) {
    const newArrTasks = tasks.filter((_, i) => i !== index);
    setTasks(newArrTasks);
  }

  // Находит нужный input элемент и добает текст в массив задач
  function addTask() {
    const newTaskInputElement = document.getElementById("newTask");
    const newTaskText = newTaskInputElement.value.trim();

    if (newTaskText !== "") {
      setTasks((tasks) => [...tasks, newTaskText]);
      newTaskInputElement.value = "";
    } else alert("Write your task in input area");
  }

  // Обработчик нажатия на Enter в поле ввода input
  function addTaskOnKeyDown(event) {
    if (event.key === "Enter") addTask();
  }

  // При изменении задач, обновляем и запись в localStorage
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
          onKeyDown={addTaskOnKeyDown}
        />
        <button onClick={addTask} className="to-do-App__Add-btn">
          add
        </button>
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
