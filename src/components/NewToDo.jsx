import { useState } from 'react';

function NewToDo({addToDo}) {
    const[value,setValue]=useState('');

    const handleChange=(e)=>{
        setValue(e.target.value);
    }
    const handleClick=(e)=>{
        addToDo(value);
        setValue('')
    }

    return (
        <div className='container'>
            <input className='roundedFrame toDoInput' type="text" value={value} placeholder="Add new task" onChange={handleChange}/>
            <button  
                disabled={!value.length} 
                className={`roundedFrame submitBtn ${!value.length?"disabled":""}`} 
                onClick={handleClick}>
                    ADD
            </button>
        </div>
    )
}

export default NewToDo