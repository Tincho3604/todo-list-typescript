import React,{ChangeEvent, useState} from 'react';
import {Itask} from '../../interfaces/interfaces';
import Table from '../Table/Table';
import moment from 'moment';
import Modal from '../ModalError/ModalError';
import swal from 'sweetalert';
import {validationTask} from '../../validations/validations';
import {SelectValues} from '../../constants/constants';
import { useForm } from "react-hook-form";
import './style.css';



type FormData = {
    taskName: string;
    status: string;
  };

const Form = () => {

    const [id, setId] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const [toDoList, setTodoList] = useState<Itask[]>([]);
    const [editMode, setEditMode] = useState<Boolean>(false);
    
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

const onSubmit = handleSubmit(data => {
    addTask(data.taskName,data.status, moment().format('h:mm:ss a'));
});



const addTask = (name:string, status:string, time:string) => {
    setId(id+1)
    const newTask = {id:id, taskName:name, openTimeTask:time, closeTimeTask:'', status:status}
    const filerArrayTask = toDoList.filter((item:Itask) => item.id !== newTask.id)
    setTodoList([...filerArrayTask, newTask])
    setEditMode(!editMode)
    
}

    const recover = (info:Itask[]):void  => {
        setTodoList(info)
}

    const editTask = (info:Itask[]):void => {  
        //const newTask = {id: id, taskName: taskName, openTimeTask: info., closeTimeTask:'', status:status}
        //const filerArrayTask:Itask[] = toDoList.filter((item:Itask) => item.id !== newTask.id)
        //setTodoList([...filerArrayTask, newTask])
        //setEditMode(!editMode)
    }

    return (
        <>
        <div className="titleContainer">
            <h1>Task App</h1>
        </div>
        <div className="mainFormContainer">
            <h2>Add a task</h2>
            <form onSubmit={onSubmit} className="formMainContainer">
                <input {...register("taskName")} type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="inputs"/>

                            <select {...register("status")} name="status" id="taskStatus" className="inputs" >
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                            </select>
                <input type="submit" name="send" id="taskSend" className="inputs" value={!editMode ? "Add task" : "Edit task"}/>
            </form>
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


