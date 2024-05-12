import React from 'react';
import './buttonSaveEditValue.css';

const ButtonSaveEditValue = ({ onClick }) => {
    return (
        <div>
            <button className="buttonSaveEditValue" onClick={onClick}>guardar</button>
        </div>
    );
};

export default ButtonSaveEditValue;