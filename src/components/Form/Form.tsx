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
import ModalEdit from '../ModalEdit/ModalEdit';



type FormData = {
    taskName: string;
    status: string;
  };

const Form = () => {

    const [id, setId] = useState<number>(1);
    const [toDoList, setTodoList] = useState<Itask[]>([]);
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [editInfo, setEditInfo] = useState<Itask[]>([]);

const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

const onSubmit = handleSubmit(data => {
    addTask(data.taskName,data.status, moment().format('h:mm:ss a'));
});



const addTask = (name:string, status:string, time:string) => {
    if(validationTask(name)){
        setId(id+1)
        const newTask = {id:id, taskName:name, openTimeTask:time, closeTimeTask:'', status:status}
        const filerArrayTask = toDoList.filter((item:Itask) => item.id !== newTask.id)
        setTodoList([...filerArrayTask, newTask])
        reset();
    }
}

    const recover = (info:Itask[]):void  => {
        setTodoList(info)
}


    const editTask = (info:Itask[]):void => {  
        setEditInfo(info);
        changeEditMode();
    }

    const changeEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <>
        <div className="titleContainer">
            <h1>Task App</h1>
        </div>
        {editMode ? <ModalEdit infoEdit={editInfo} recover={recover} allTask={toDoList} changeEditMode={changeEditMode}/> :
        <div className="mainFormContainer">
            <h2>Add a task</h2>
                <form onSubmit={onSubmit} className="formMainContainer">
                    <input {...register("taskName")} type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="inputs"/>
                        <select {...register("status")} name="status" id="taskStatus" className="inputs" >
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    <input type="submit" name="send" id="taskSend" className="inputs"/>
                </form>
            </div>
}
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


