import React from 'react';
import './menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {

    const navigate = useNavigate();

    return (
        <div className="menuScreen1">
            <h1>PetreobowL</h1>
            <h2></h2>
            <div className = "menuButtons">
                <button className='buttonMenu' onClick={() => navigate("/register")}>registrar entrenador</button>
                <button className='buttonMenu' onClick={() => navigate('/login')}>login</button>
            </div>
        </div>
    );
}

export default Menu;