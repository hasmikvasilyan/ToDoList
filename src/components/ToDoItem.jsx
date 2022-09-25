import { useState } from 'react';
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg';

function ToDoItem({toDo,removeToDo,editToDo}) {
    const [checked, setChecked]=useState(toDo.completed);
    const handleChange=()=>{
        setChecked(prevState=>!prevState)
        editToDo(toDo.id,!toDo.completed)
    }
    const handleClick=()=>{
        removeToDo(toDo.id)
    }

  return (
    <li className='roundedFrame toDoItem'>
        <div className="checkBoxWrapper">
            <input type="checkbox" name={toDo.name} value={checked} onChange={handleChange} defaultChecked={checked} />
            <label htmlFor={toDo.name}>{toDo.name}</label>
        </div>
        <DeleteIcon className="deleteIcon" onClick={handleClick}/>
    </li>
  )
}

export default ToDoItem