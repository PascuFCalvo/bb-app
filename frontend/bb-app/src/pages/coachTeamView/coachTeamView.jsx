import React, { useEffect, useState } from 'react';
import './coachTeamView.css';
import { useNavigate } from 'react-router-dom';

function CoachTeamView() {
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userStorageInfo = localStorage.getItem("user");
        if (!userStorageInfo) {
            console.log('No user info available');
            setIsLoading(false);
            return;
        }

        const user = JSON.parse(userStorageInfo);
        const userId = user.userid;

        const getTeamByUserId = (userId) => {
            console.log(userId);
            fetch(`http://localhost:3000/api/v1/entrenador/equipos/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setTeam(data);
                    setIsLoading(false);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                });
        };

        getTeamByUserId(userId);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!team) {
        return <div>No team data available.</div>;
    }

    return (
        <><div className="bodyTeamPage">
            <h1>tu equipo</h1>
            <div className="teamCard">
                <h2>{team.body.teamname}</h2>
                <h2>{team.body.teamrace}</h2>
                <h2>{team.body.teamvalue} mo</h2>
            </div>
            <button className="buttonBack" onClick={() => navigate('/mainCoachView')}>volver</button>
        </div>
        </>
    );
}
    export default CoachTeamView;
