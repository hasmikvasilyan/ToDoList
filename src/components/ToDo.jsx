import { useState,useEffect } from "react";
import ToDoItem from './ToDoItem';
import NewToDo from './NewToDo';
import { v4 as uuidv4 } from "uuid";

function ToDo() {
    const[toDos, setToDos]=useState([]);

    useEffect(()=>{
        if(localStorage.getItem('localToDos')){
            const storedToDos=JSON.parse(localStorage.getItem('localToDos'))
            setToDos(storedToDos)
        }
    },[])

    const handleToDoCreation=(toDoItem)=>{
        const newToDo={            
            id: uuidv4(),
            name:toDoItem,
            completed:false,            
        }
        const checkExistance=toDos.find(toDo=>toDo.name.toLowerCase()===toDoItem.toLowerCase());
        if(checkExistance){
            let confirm = window.confirm(
                `You already have '${toDoItem}' to do item,  do you still want to add it?`
            );
            if (confirm) {
                setToDos(prevState=>[...prevState,newToDo]);
                localStorage.setItem("localToDos",JSON.stringify([...toDos,newToDo]))
            }
        } 
        else{
            setToDos(prevState=>[...prevState,newToDo ]);
            localStorage.setItem("localToDos",JSON.stringify([...toDos,newToDo]))
        }
    }
       
    const handleToDoCompletion=(id,value)=>{
        const updatedToDos= toDos.map(toDo=>{
            if(toDo.id===id){
                toDo.completed=value;
            }
            return toDo
        });
        setToDos(updatedToDos)
        localStorage.setItem("localToDos",JSON.stringify(updatedToDos))
    }
    
    const handleToDoDeletion=(id)=>{
       const updatedToDos= toDos.filter(toDo=>toDo.id!==id);
       setToDos(updatedToDos)
       localStorage.setItem("localToDos",JSON.stringify(updatedToDos))
    }
    return (
        <>
            <div className="container">
                <h1 className="title">To Do</h1>
                {toDos.length?(<ul className="todoList">{
                    toDos.map(toDo=>(
                        <ToDoItem 
                            key={toDo.id}
                            toDo={toDo}
                            removeToDo={handleToDoDeletion}
                            editToDo={handleToDoCompletion}

                        />))
                    }
                </ul>):<p className="text">Good job! you have completed all to dos</p>}
            </div>
            <hr className="divider" />
            <NewToDo addToDo={handleToDoCreation}/>
        </>        
    )
}

export default ToDo