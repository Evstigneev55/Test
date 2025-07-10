import { memo } from "react";

import "./styleComponents/showCount.css";

const ShowCount = ({ count }) => {

  if (count > 10 && count < 20) {
    
    return <b className=""> count in depends (10 & 20) ({count}) </b>;

  } else if (count >= 20 && count <= 25) {
    
    return <b className=""> count in depends [20 & 25] ({count}) </b>;

  } else {
    function countOutRange(curCount) {
        if (curCount < 10) return (<em>&lt; 10</em>);
        else return (<i>26+</i>)
    }
    return (
      <b className=""> count is {countOutRange(count)}, you are out of other dependses </b>
    );
  }
};

export default memo(ShowCount, (oldProps, newProps) => {
    if (newProps.count < 11 || newProps.count > 26) {
        console.log('React сравнил oldProps, newProps (return true): ', oldProps, newProps)
        
        return true;
    } else {
        console.log('React сравнил oldProps, newProps (return false): ', oldProps, newProps)
        
        return false;
    }
});
