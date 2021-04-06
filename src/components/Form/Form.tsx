import React,{ChangeEvent, useState} from 'react';
import {Itask} from '../../interfaces/interfaces';
import Table from '../Table/Table';
import Modal from '../Modal/Modal';
import swal from 'sweetalert';
import {validationTask, validationDate} from '../../validations/validations';
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
    const editTask = (info:Itask[]):void => {  
            setId(info[0].id)
            setTask(info[0].taskName)
            setDate(info[0].date)
            setStatus(info[0].status)
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
    if(validationTask(task) && validationDate(date)){
    setId(id+1)
    const newTask = {id:id, taskName:task, date:date, status:status}
    const filerArrayTask:Itask[] = toDoList.filter((item:Itask) => item.id !== newTask.id)
    setTodoList([...filerArrayTask, newTask])
    clearFields();
    swal("Your task has been created!", {
        icon: "success",
      });
    }
}

const clearFields = () => {
    setTask('')
    setDate('')
}

    return (
        <>
        <div className="titleContainer">
            <h1>Task App</h1>
        </div>
        <div className="mainFormContainer">
            <h2>Add a task</h2>
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
    recover={recover}
    editTask={editTask}
    />
}

</>
    
    )
} 

export default Form;


