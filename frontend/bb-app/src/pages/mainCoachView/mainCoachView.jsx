import React from 'react';
import './mainCoachView.css';

function MainCoachView() {
    return (
        <div className="mainCoachView">
            <h1>panel de entrenador</h1>
            <div className="entrenadorButtons">
                <button className="buttonEntrenador">crear equipo</button>
                <button className="buttonEntrenador">ver mi equipo</button>
            </div>
        </div>
    );
}

export default MainCoachView;
