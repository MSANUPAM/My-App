import React,{useState} from "react";

export default function Counter()
 {  const [count,setCounter] = useState(0)

    const increment=() => {
        setCounter( count +1)
     };
    const decrement=() => {
       setCounter( count -1)
    };
    const reset=() =>{
        setCounter(0)
    }
    return( 
     <div className = "counter">
     <h1>react counter</h1>
    <button className="Btn" onClick={increment}>+</button>
     <div className="presentValue">{count}</div>
    <button className="Btn" onClick={decrement}>-</button><br/>
    <button className="Btn" onClick = {reset}>reset</button>

    </div>
  );
} 