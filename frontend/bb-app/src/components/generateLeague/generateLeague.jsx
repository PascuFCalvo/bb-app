import React, { useState, useEffect } from 'react';
import './generateLeague.css';

function GenerateLeague() {
    const [teams, setTeams] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/admin/equipos')
            .then(response => response.json())
            .then(data => {
                const teamNames = data.body.map(team => team.teamname);
                setTeams(teamNames);
            });
    }, []);

    useEffect(() => {
        if (teams.length > 0) {
            const scheduleFunction = generateRoundRobinSchedule([...teams]); // Usar una copia de `teams`
            setSchedule(scheduleFunction);
        }
    }, [teams]);

    function generateRoundRobinSchedule(teams) {
        if (teams.length % 2 !== 0) {
            teams.push("Bye"); // Añade un equipo fantasma si es impar
        }
        const numRounds = teams.length - 1;
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

            teamsRotating.unshift(teamsRotating.pop()); // Rotar los equipos
        }
        return schedule;
    }

    return (
        <div>
            <h1>Generate League</h1>
            <ul>
                {teams.map((teamName, index) => (
                    <li key={index}>{teamName}</li>
                ))}
            </ul>
            <h2>Matches</h2>
            {schedule.map((round, roundIndex) => (
                <div className="matchesSchedule" key={roundIndex}>
                    <h3>Round {roundIndex + 1}</h3>
                    <div >
                        {round.map((match, matchIndex) => (
                            <div className = "matchInfo" key={matchIndex}>{match}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GenerateLeague;
