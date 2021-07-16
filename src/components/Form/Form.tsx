import React,{ChangeEvent, useState} from 'react';
import {Itask} from '../../interfaces/interfaces';
import Table from '../Table/Table';
import moment from 'moment';
import Modal from '../Modal/Modal';
import swal from 'sweetalert';
import {validationTask} from '../../validations/validations';
import {SelectValues} from '../../constants/constants';
import './style.css';

const Form = () => {



    const [id, setId] = useState<number>(1);
    const [task, setTask] = useState<string>('');
    const [openTimeTask, setOpenTimeTask] = useState<string>('');
    const [closeTimeTask, setCloseTimeTask] = useState<string>('');
    const [status, setStatus] = useState<string>('Pending');
    const [toDoList, setTodoList] = useState<Itask[]>([]);
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [arraySelectValues, setArraySelectValues] = useState<string[]>(SelectValues);
    
    
    const recover = (info:Itask[]):void  => {
        setTodoList(info)
}

    const editTask = (info:Itask[]):void => {  
            setEditMode(!editMode)
            setId(info[0].id)
            setTask(info[0].taskName)
            setStatus(info[0].status)
            setCloseTimeTask(moment().format('h:mm:ss a'))
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
        setOpenTimeTask(moment().format('h:mm:ss a'))
}

const getValueSelect = (event:React.ChangeEvent<HTMLInputElement>): void => {
    setStatus(event.target.value)
}


const addTask = () => {
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
        setStatus("Pending")
        swal("Your task has been modified!", {
            icon: "success",
            });
        }
    setEditMode(!editMode)
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
            <div className="inputRadioButtons">
                    <div className="eachButton">
                        <label htmlFor="statusLabel" id="doneStatus">Done</label>
                        <input type="radio" name="status" id="taskStatus" onChange={getValueSelect} value="Done"/>
                    </div>
                    
                    <div className="eachButton">
                        <label htmlFor="pendingLabel" id="pendingStatus">Pending</label>
                        <input type="radio" name="status" id="taskStatus" onChange={getValueSelect} value="Pending"/>
                    </div>
                </div>
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


