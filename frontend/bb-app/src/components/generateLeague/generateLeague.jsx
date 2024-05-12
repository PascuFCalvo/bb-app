import React, { useState, useEffect } from 'react';

function GenerateLeague() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/admin/equipos')
            .then(response => response.json())
            .then(data => {
                const teamNames = data.body.map(team => team.teamname);
                setTeams(teamNames);
            });
    }, []);

    function generateRoundRobinSchedule(teams) {
        if (teams.length % 2 !== 0) {
            teams.push("Bye"); // Añade un equipo fantasma si es impar
        }
        const numRounds = teams.length - 1; // Jornadas necesarias
        const halfSize = teams.length / 2;
    
        let teamsFixed = teams.slice(0, halfSize);
        let teamsRotating = teams.slice(halfSize, teams.length);
    
        let schedule = [];
    
        for (let round = 0; round < numRounds; round++) {
            let roundMatches = [];
            for (let i = 0; i < teamsFixed.length; i++) {
                const home = teamsFixed[i];
                const away = teamsRotating[i];
                if (home !== "Bye" && away !== "Bye") {
                    roundMatches.push(`${home} vs ${away}`);
                }
            }
            schedule.push(roundMatches);
    
            // Rotar los equipos a la derecha, manteniendo el primero en su lugar
            teamsRotating.unshift(teamsRotating.pop());
        }
        return schedule;
    }

    useEffect(() => {
        const schedule = generateRoundRobinSchedule(teams);
        console.log(schedule);
    
    }, [teams]);

    return (
        <div>
            <h1>Generate League</h1>
            <ul>
                {teams.map((teamName, index) => (
                    <li key={index}>{teamName}</li>
                ))}
            </ul>
        </div>
    );
}

export default GenerateLeague;
