import img from '../../images/not-found.jpg'
import './style.css'

declare module "*.jpg" {
    const value: any;
}
const ModalError = () => {

return(
    <div className="MainModalContainer">
            <h2>Tasks Not founds</h2>
            <img alt="error" src={img} className="modalContainer"/>
    </div>
    )
}

export default ModalError
