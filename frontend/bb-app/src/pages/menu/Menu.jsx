import React from 'react';
import './menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>BB APP</h1>
            <div>
                <button onClick={() => navigate("/register")}>Registro de Usuario</button>
                <button onClick={() => navigate('/login')}>Login de Usuario</button>
            </div>
        </div>
    );
}

export default Menu;