import { useEffect } from "react";

import './styleComponents/btnComponent.css'

const BtnCount = ({onClickHandler}) => {
    useEffect(() => {
      console.log('Сработал useEffect на отрисовку компонента BtnCount')

      return (() => {console.log('компонент BtnCount уничтожен!')})
    }, [])

    return (
        <div className="">
        One more?
        <button className="" onClick={onClickHandler}>
          Click here to make count more
        </button>
      </div>
    )
}

export default BtnCount;