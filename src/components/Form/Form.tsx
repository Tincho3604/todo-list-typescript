import React,{ChangeEvent, useState} from 'react';
import {Itask} from '../../interfaces/interfaces';
import Table from '../Table/Table';
import Modal from '../Modal/Modal';
import './style.css';

const Form = () => {



    const [id, setId] = useState<number>(1);
    const [task, setTask] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [toDoList, setTodoList] = useState<Itask[]>([]);

    const recover = (info:Itask[]):void  => {
        setTodoList(info)
}

const getValue = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        switch (event.target.name) {
            case 'taskName': {
                setTask(event.target.value)
                break;
            }
            case 'taskDate': {
                setDate(event.target.value)
                break;
            }
            case 'status': {
                setStatus(event.target.value)
                break;
            }
        }
}

const getValueSelect = (event:React.ChangeEvent<HTMLSelectElement>): void => {
    setStatus(event.target.value)
}


const addTask = () => {
    setId(id+1)
    const newTask = {id:id, taskName:task, date:date, status:status}
    setTodoList([...toDoList, newTask])
    clearFields();
}

const clearFields = () => {
    setTask('')
    setDate('')
}

    return (
        <>
    <div className="mainFormContainer">
            <h1>Add a task</h1>
            <input type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="inputs" onChange={getValue} value={task}/>
            <input type="date" name="taskDate" placeholder="Ingress date" id="taskDate" className="inputs" onChange={getValue} value={date}/>
            <select name="status" id="taskStatus" className="inputs" onChange={getValueSelect}>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
            </select>
            <input type="submit" name="send" id="taskSend" className="inputs" value="Add task" onClick={addTask}/>
    </div>
    
    {toDoList.length === 0 ?  <Modal/> : 
    <Table 
    tasks={toDoList}
    recover={recover}/>
}
</>
    
    )
} 

export default Form;


