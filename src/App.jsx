import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./App.css";

function App() {
  const [count, setCount] = useState(30); // сам счётчик

  const navigate = useNavigate();

  // При отрисовке компонента `App` начинает тикать таймер
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((curCount) => {
        curCount--;
        console.log("tic: ", curCount);

        if (curCount < 1) {
          console.log("время вышло");
          clearInterval(timerId);
        }

        return curCount;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // этот useEffect нужен, чтобы избежать вызова навигации во время рендера компонента App
  useEffect(() => {
    if (count === 0) navigate("/to-do");
  }, [count]);

  return (
    <>
      <h1>You have {count} sec to choose</h1>

      <nav className="choose-timer-page">
        <Link to="/login">Странная форма регистрации</Link>
        <Link to="/to-do">to-do App</Link>
        <Link to="/lessons">
          Tasks from lessons on <b>React</b>
        </Link>
      </nav>
    </>
  );
}

export default App;
