import React, { useState } from 'react';
import './mainCoachView.css';
import FormCreateTeam from '../../components/formCreateTeam/formCreateTeam';
import { useNavigate } from 'react-router-dom';
import LeftSideBar from '../../components/leftSideBar/leftSideBar';

function MainCoachView() {
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const toggleForm = () => {
        setShowForm(current => {
            if (current) {

                showButtons();
            } else {

                hideButtons();
            }
            return !current;
        });
    };

    const hideButtons = () => {
        document.getElementById("entrenadorButtons").style.display = "none";
    };

    const showButtons = () => {
        document.getElementById("entrenadorButtons").style.display = "flex";
    };

    const goToTeamView = () => {
        navigate('/CoachTeamView'); // Use a route string here
    };

    return (
        <div className='bodyPage'>
            <LeftSideBar />
            <div className="mainCoachView">
                <h1>panel de entrenador</h1>
                <div id="entrenadorButtons" className="entrenadorButtons">
                    <button className="buttonEntrenador" onClick={goToTeamView}>ver mi equipo</button>
                    <button className="buttonEntrenador" onClick={toggleForm}>crear equipo</button>
                </div>
                {showForm && <FormCreateTeam closeForm={toggleForm} />}
            </div>
        </div>

    );
}

export default MainCoachView;
