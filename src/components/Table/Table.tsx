import swal from 'sweetalert';
import {Itask} from '../../interfaces/interfaces';
import * as FcIcons from "react-icons/fc";
import './style.css'

interface Props {
  tasks:Itask[];
  recover(info:Itask[]): void;
  editTask(info:Itask[]): void;
}

const Table = ({tasks,recover,editTask}:Props) => {

  const deleteTask = (id:number) => {
    swal("Your task has been deleted!", {
      icon: "success",
    });
        recover(tasks?.filter((item:Itask) =>  item?.id !== id))
  }

  const changeStatus = (id:number) => {
    swal("Edit Task",`Please complete the form to edit the task`, {
      icon: "success",
    });
    const value = tasks.filter((item:Itask) => item.id === id)
    editTask(value)
  } 

return(
<>
<table>
  <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Date</th>
        <th scope="col">Status</th>
        <th scope="col">Delete</th>
        <th scope="col">Edit task</th>
      </tr>
  </thead>
  <tbody>
  {tasks?.map((item:Itask,index:number) => {
      return( 
          <tr key={index}>
              <td data-label="Id">{item.id}</td>
              <td data-label="Name">{item.taskName}</td>
              <td data-label="Date">{item.date}</td>
              <td data-label="Status">{item.status === "Done" ? <FcIcons.FcOk/> : <FcIcons.FcHighPriority/>}</td>
              <td data-label="Delete"><button className="deleteButton" onClick={() => deleteTask(item.id)}>Delete</button></td>
              <td data-label="Edit task"><button className="editButton" onClick={() => changeStatus(item.id)}>Edit task</button></td>
          </tr>
        )
      })}
  </tbody>
</table>
</>)
}

export default Table;
