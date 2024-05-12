import React from 'react';
import './buttonEditValue.css';

const ButtonEditValue = ({ onClick }) => {
    return (
        <div>
            <button className="buttonEditValue" onClick={onClick}>editar</button>
        </div>
    );
};

export default ButtonEditValue;