import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react"
import ToDo from './components/toDo';
import axios from "axios"
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
      axios.get("/todo")
      .then(data => setData(data.data))
       
  },[])
  return (
    <div className="App">
     <h1>To Do's App</h1>
     <form method="POST" action="/todo/create">
       <input style={{maxWidth: "200px", display:"inline-flex"}} className="form-control" type="text" name="name" placeholder="Type a todo"/>
       <button  className="btn btn-success">Create</button>
     </form>
     <div id="todo-wrap">
     {!data ? "" : data.slice(0).reverse().map((item, index ) => (
          <ToDo content={item.content} time={item.time} date={item.date} id={item._id} count={index}/>
     ))}
     </div>
    </div>
  );
}

export default App;
