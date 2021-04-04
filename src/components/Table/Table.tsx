import React,{useState,useEffect} from 'react'
import {Itask} from '../../interfaces/interfaces';
import './style.css'

interface Props {
  tasks:Itask[];
  recover(info:Itask[]): void;
}
const Table = ({tasks,recover}:Props) => {

  const deleteTask = (id:number) => {
    recover(tasks?.filter((item:Itask) =>  item?.id !== id))
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
        <th scope="col">Edit</th>
      </tr>
  </thead>
  <tbody>
  {tasks?.map((item:Itask,index:number) => {
      return( 
          <tr key={index}>
              <td>{item.id}</td>
              <td>{item.taskName}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td><button className="deleteButton" onClick={() => deleteTask(item.id)}>Delete</button></td>
              <td><button className="editButton">Finished</button></td>
          </tr>
        )
      })}
  </tbody>
</table>
</>)
}

export default Table;
