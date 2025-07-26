import { useState } from "react";

import ShowCount from "./components/showCount.jsx";
import BtnCount from "./components/btnCount.jsx";

const App = () => {
  const [count, setCount] = useState(0);

  //   const currentScoreMiniCountPlus1 = increaseCount();
  //   currentScoreMiniCountPlus1();
  //   currentScoreMiniCountPlus1();
  //   currentScoreMiniCountPlus1();

  function onClickHandler() {
    setCount((count) => {
      count++;
      console.log("Нажали на кнопку");
      return count;
    });
  }

  return (
    <>
      <ShowCount count={count}/>
        
      <div>
        <BtnCount onClickHandler={onClickHandler}/>
      </div>
    </>
  );
};

// const increaseCount = () => {
//   let miniCount = 0;
//   return function increaseMini() {
//     miniCount++;
//   };
// };

export default App;
