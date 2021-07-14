import React,{ChangeEvent, useState, useEffect} from 'react';
import {Itask} from '../../interfaces/interfaces';
import Table from '../Table/Table';
import moment from 'moment';
import Modal from '../Modal/Modal';
import swal from 'sweetalert';
import {validationTask} from '../../validations/validations';
import './style.css';

const Form = () => {



    const [id, setId] = useState<number>(1);
    const [task, setTask] = useState<string>('');
    const [openTimeTask, setOpenTimeTask] = useState<string>('');
    const [closeTimeTask, setCloseTimeTask] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [toDoList, setTodoList] = useState<Itask[]>([]);
    const [editMode, setEditMode] = useState<Boolean>(false);
    
    
    const recover = (info:Itask[]):void  => {
        setTodoList(info)
}
    const changeEditButton = (editMode:Boolean):void => {
        setEditMode(editMode);
    }
    const editTask = (info:Itask[]):void => {  
            setEditMode(!editMode)
            setId(info[0].id)
            setTask(info[0].taskName)
            setCloseTimeTask(moment().format('h:mm:ss a'))
            setStatus(info[0].status)
    }

const getValue = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        switch (event.target.name) {
            case 'taskName': {
                setTask(event.target.value)
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
    setOpenTimeTask(moment().format('h:mm:ss a'))
    if(validationTask(task)){
    setId(id+1)
    const newTask = {id:id, taskName:task, openTimeTask:openTimeTask, closeTimeTask:closeTimeTask, status:status}
    const filerArrayTask:Itask[] = toDoList.filter((item:Itask) => item.id !== newTask.id)
    setTodoList([...filerArrayTask, newTask])
    clearFields();
    if(!editMode){
    swal("Your task has been created!", {
        icon: "success",
        });
    }else{
        setEditMode(!editMode)
        swal("Your task has been modified!", {
            icon: "success",
            });
        }
    }
}

const clearFields = () => {
    setTask('')
}

    return (
        <>
        <div className="titleContainer">
            <h1>Task App</h1>
        </div>
        <div className="mainFormContainer">
            <h2>Add a task</h2>
            <input type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="inputs" onChange={getValue} value={task}/>
            <select name="status" id="taskStatus" className="inputs" onChange={getValueSelect}>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
            </select>
            <input type="submit" name="send" id="taskSend" className="inputs" value={!editMode ? "Add task" : "Edit task"} onClick={addTask}/>
        </div>
    
    {toDoList.length === 0 ? <Modal/> : 
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


