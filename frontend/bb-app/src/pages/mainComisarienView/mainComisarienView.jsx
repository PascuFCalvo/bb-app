import React from 'react';
import './mainComisarienView.css';

function MainCoachView() {
    return (
        <div className="mainComisarienView">
            <h1>panel del comisarien</h1>
            <div className="entrenadorButtons">
                <button className="buttonEntrenador">sancionar</button>
                <button className="buttonEntrenador">las actas !</button>
            </div>
        </div>
    );
}

export default MainCoachView;
