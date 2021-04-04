import React from 'react'
import './style.css'

declare module "*.jpg" {
    const value: any;
 }
const Modal = () => {

return(
    <div className="MainModalContainer">
            <h1>Task Not founds</h1>
        <div className="modalContainer"/>
    </div>
    )
}

export default Modal
