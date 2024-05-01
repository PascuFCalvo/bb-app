import React, { useState } from 'react';
import './mainCoachView.css';
import { useNavigate } from 'react-router-dom';
import FormCreateTeam from '../../components/formCreateTeam/formCreateTeam';

function MainCoachView() {

    let userDataSeason = JSON.parse(localStorage.getItem("user"));


    const [showCreateTeam, setShowCreateTeam] = useState(false);


    const handleCreateTeam = () => {
        setShowCreateTeam(!showCreateTeam);
        console.log("crear equipo");
    };

    return (
        <div className="mainCoachView">
            <h1>panel de entrenador</h1>
            <div className="entrenadorButtons">
                <button className="buttonEntrenador" onClick={handleCreateTeam}>crear equipo</button>
                <button className="buttonEntrenador">ver mi equipo</button>
                {
                    showCreateTeam && <FormCreateTeam />
                }
            </div>
        </div>
    );
}

export default MainCoachView;
