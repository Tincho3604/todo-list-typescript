import React from 'react'
import img from '../../images/not-found.jpg'
import './style.css'

declare module "*.jpg" {
    const value: any;
}
const Modal = () => {

return(
    <div className="MainModalContainer">
            <h1>Tasks Not founds</h1>
            <img alt="error" src={img} className="modalContainer"/>
    </div>
    )
}

export default Modal
