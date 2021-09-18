import React, { useRef, useState } from "react";
import "./style.css";
import axios from "axios";
const ToDo = ({content, time, date ,id ,count}) => {
    const [val, setVal] = useState(content);
    const popUp = (e) => {
         const allForms = document.getElementsByClassName("editform");
         const id = e.currentTarget.id
         allForms[id].style.display = "flex"
    } 
    const closePopUp = (e) => {
        const form = e.currentTarget.parentElement;
        form.style.display = "none"
    }
   
    return(
        <div className="todo">
            <p className="name">{content}</p>
            <p className="timings"><span>{time}</span> <span>{date}</span></p>
            <form className="editform" method="POST" action={`/todo/edit/${id}`}>
             <input onChange={e => setVal(e.currentTarget.value)} name="name" className="form-control" type="text" value={val}></input>
             <button className="btn btn-success">Edit</button>
             <button type="button" onClick={closePopUp} className="close">&#10060;</button>
            </form>
            <aside className="edit">
            <button className="editBtn" id={count} onClick={popUp}><i className="fa fa-pencil"></i></button>
            <form action={`/todo/delete/${id}?_method=DELETE`} method="POST">
            <button className="deleteBtn"><i className="fa fa-trash"></i></button>
            </form>
            </aside>
        </div>
    )
}
export default ToDo;