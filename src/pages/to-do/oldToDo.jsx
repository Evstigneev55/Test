import { useState } from "react";

const ToDoApp = () => {
  if (localStorage.getItem("firstTaskIndex") === null)
    localStorage.setItem("firstTaskIndex", "1");
  if (localStorage.getItem("lastTaskIndex") === null)
    localStorage.setItem("lastTaskIndex", "0");

  let firstIndex = localStorage.getItem("firstTaskIndex");
  let lastIndex = localStorage.getItem("lastTaskIndex");

  const [arrReactTasks, setTask] = useState([""]);

  // добавляет задание в конец (по индексу)
  function addTask() {
    const newTaskInputElement = document.getElementById("newTaskInput");
    const newTaskText = newTaskInputElement.value.trim();

    
    lastIndex++;

    localStorage.setItem(lastIndex, newTaskText);

    localStorage.setItem("lastTaskIndex", lastIndex);

    setTask((arrReactTasks) => {
      arrReactTasks.push(
        <li key={lastIndex}>
          <span>{newTaskText}</span>{" "}
          <button onClick={delTask} value={lastIndex}>
            Delete
          </button>
        </li>
      );
      return arrReactTasks;
    });
  }

  function delTask(event) {
    if (confirm("Are you sure?")) {
      const taskId = event.target.value;
      localStorage.removeItem(taskId);

      if (taskId === lastIndex) {
        for (let curTask, i = taskId; i >= firstIndex; i--) {
          curTask = localStorage.getItem(i);
          if (curTask === null) {
            continue;
          } else {
            lastIndex = i;
            localStorage.setItem("lastTaskIndex", i);
            break;
          }
        }
      } else if (taskId === firstIndex) {
        for (let curTask, i = taskId; i <= lastIndex; i++) {
          curTask = localStorage.getItem(i);
          if (curTask === null) {
            continue;
          } else {
            firstIndex = i;
            localStorage.setItem("firtTaskIndex", i);
            break;
          }
        }
      }
    }
  }
  function DisplayTasks({arrReactTasks}) {
    if (
      localStorage.getItem("lastTaskIndex") === null &&
      localStorage.getItem("firstTaskIndex") === null
    ) {
      return <h3>You haven`t any tasks yet.</h3>;
    }

    for (let curNotice, i = firstIndex; i <= lastIndex; i++) {
      curNotice = localStorage.getItem(i);
      if (curNotice === null) continue;

      arrReactTasks.push(
        <li key={i}>
          <span>{curNotice}</span>{" "}
          <button onClick={delTask} value={i}>
            Delete
          </button>
        </li>
      );
    }

    return <ol>{arrReactTasks}</ol>;
  }

  return (
    <>
      <h1>Your tasks list</h1>
      <input
        id="newTaskInput"
        type="text"
        placeholder="Write your new task here!"
      />
      <button onClick={addTask}>Add task</button>

      <DisplayTasks arrReactTasks={arrReactTasks}/>
    </>
  );
};

// Циклом вывести все задачи, что есть в localStorage
//

export default ToDoApp;
