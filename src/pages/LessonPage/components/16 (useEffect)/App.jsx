import { useState } from "react";
import ChildrenComponent from "./components/ChildrenComponent.jsx";

const App = () => {
  const [isBtnActiv, setStateBtn] = useState(false);
  const [count, setCountBtn] = useState(0);

  const onMouseEnterBtnHandler = () => {
    setStateBtn( (currentState) => !currentState);
  };

  const onClickBtnHandler = () => {
    setCountBtn((curCount) => {
      curCount++;
      return curCount;
    });
  };
  const onPointerLeaveBtnHandler = () => {
    setCountBtn((curCount) => {
      curCount--;
      return curCount;
    });
  };

  return (
    <div>
      <button onClick={onMouseEnterBtnHandler}> кликни, балбес </button>
      {isBtnActiv && <ChildrenComponent count={count} />}

      <br/>
      <br/>
            
      <button onClick={onClickBtnHandler} onPointerLeave={onPointerLeaveBtnHandler}>
        клик = +1, уберешь курсор = -1
      </button>
            
      <h2>{count}</h2>

    </div>
  );
};

export default App;