import './style.css'
import { useForm } from "react-hook-form";
import {Itask} from '../../interfaces/interfaces';
import swal from 'sweetalert';
import moment from 'moment';
import {validationTask} from '../../validations/validations';

type FormData = {
    taskName: string;
    status: string;
};

interface Props {
    infoEdit: Itask[];
    allTask: Itask[];
    recover(info:Itask[]): void;
    changeEditMode(): void;
}

const ModalEdit = ({infoEdit, recover, allTask, changeEditMode}:Props) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => {
        if(validationTask(data.taskName)){
        infoEdit[0].taskName = data.taskName
        infoEdit[0].status = data.status
        if (data.status === "Done") infoEdit[0].closeTimeTask = moment().format('h:mm:ss a')

        const filerArrayTask = allTask.filter((item:Itask) => item.id !== infoEdit[0].id)
        recover([...filerArrayTask, infoEdit[0]])
        swal("Your task has been edited!", {
            icon: "success",
        });
        changeEditMode();
        }
    })

    return(
        <div className="main-modal-edit-container">
            <h1>Edit task</h1>
            <h2>{`Edit the task N ° ${infoEdit[0].id}`}</h2>
                <form onSubmit={onSubmit} className="formMainContainer">
                <div className="main-edit-form-container">
                    <input  {...register("taskName")} type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="editInputs" defaultValue={infoEdit[0].taskName}/>
                        <select {...register("status")} name="status" id="taskStatus" className="editInputs"  defaultValue={infoEdit[0].status}>
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    <input type="submit" name="send" id="taskSend" className="editInputs" value="Edit"/>
                </div>
            </form>
        </div>
        )
    }

    export default ModalEdit