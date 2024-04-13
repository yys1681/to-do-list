import React, { useState, useEffect } from 'react';
import './style.css'; // 스타일 시트를 가져옵니다.

function TimeText() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
      const update = () => {
          const today = new Date();
          setSeconds(today.getSeconds());
          setMinutes(today.getMinutes());
          setHours(today.getHours());
      }

      update();

      const timeFlow = setInterval(() => {
          update();
      }, 1000);

      return () => clearInterval(timeFlow);
  }, []);

  return (
    <div className="timeStyle">
      {hours.toString().padStart(2, "0")} :{" "}
      {minutes.toString().padStart(2, "0")} :{" "}
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

function ToDoItem({ text, onDeleteClicked }) {
  return (
    <div className="toDoItemStyle">
      <label>
        <input className="checkboxStyle" type="checkbox" defaultChecked={false} />
        {text}
      </label>
      <button className="deleteButtonStyle" onClick={onDeleteClicked}></button>
    </div>
  );
}

function App() {
  const [toDo, setToDo] = useState("");
  const [toDosList, setToDosList] = useState([]);

  const onChange = (event) => {
    setToDo(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(toDo);

    setToDosList((prevArray) => [...prevArray, toDo]);
    setToDo("");
  };

  const onDeleteToDo = (index) => {
    const currentArray = [...toDosList];
    currentArray.splice(index, 1);
    
    setToDosList(currentArray);
  };

  return (
    <div>
      <TimeText /> {/* 시간 텍스트 컴포넌트 추가 */} 
      <form onSubmit={onSubmit}>
        <input
          className="toDoInputStyle"
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="Write your to do..."
        />
      </form>
      <hr />
      <ul>
        {toDosList.map((item, index) => (
          <ToDoItem key={index} text={item} onDeleteClicked={() => onDeleteToDo(index)} />
        ))}
      </ul>
    </div>
  );
}
export default App;





  