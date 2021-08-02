import './style.css'
import { useForm } from "react-hook-form";

type FormData = {
    taskName: string;
    status: string;
};

const ModalEdit = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => console.log(data))

    return(
        <div className="main-modal-edit-container">
            <h1>Edit task</h1>
            <h2>{`Edit the task N ° 1`}</h2>
                <form onSubmit={onSubmit} className="formMainContainer">
                <div className="main-edit-form-container">
                    <input  {...register("taskName")} type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="inputs"/>
                        <select {...register("status")} name="status" id="taskStatus" className="inputs" >
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    <input type="submit" name="send" id="taskSend" className="inputs" value="Edit"/>
                </div>
            </form>
        </div>
        )
    }

    export default ModalEdit