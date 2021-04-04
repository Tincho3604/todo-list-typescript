import React from 'react'
import Instagram from '../../images/instagram.png'
import Linkedin from '../../images/linkedin.png'
import Github from '../../images/github.png'
import './style.css';

const Footer = () => {
return (
    <div className="mainFooterContainer">
        <div className="footer">
            <a href={"https://www.instagram.com/clave_code/?hl=es"}><img src={Instagram} alt="instagram"/></a>
            <a href={"https://www.linkedin.com/in/martin-cumpe-77736a198/"} ><img src={Linkedin} alt="linkedin"/></a>
            <a href={"https://github.com/Tincho3604"}><img src={Github} alt="github"/></a>
        </div>
    </div>
)
}

export default Footer