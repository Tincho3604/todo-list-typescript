import React from 'react'
import './style.css'

const Form = () => {

    return (
    <div className="mainFormContainer">
        <h1>Add a task</h1>
        <input type="text" name="taskName" placeholder="Ingress the task name" id="taskName" className="inputs"/>
        <input type="date" name="taskDate" placeholder="Ingress date" id="taskDate" className="inputs"/>
        <select name="status" id="taskStatus" className="inputs">
            <option value="Pending">High priority</option>
            <option value="Done">Low priority</option>
        </select>
        <input type="submit" name="send" id="taskSend" className="inputs" value="Send"/>
    </div>
    )
} 

export default Form;