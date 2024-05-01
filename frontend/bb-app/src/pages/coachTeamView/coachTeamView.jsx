import React, { useEffect, useState } from 'react';
import './coachTeamView.css';
import { useNavigate } from 'react-router-dom';

function CoachTeamView() {
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userStorageInfo = localStorage.getItem("user");
        if (!userStorageInfo) {
            console.log('No user info available');
            setIsLoading(false);
            return;
        }

        const user = JSON.parse(userStorageInfo);
        fetchTeamAndPlayers(user.userid);
    }, []);

    const fetchTeamAndPlayers = async (userId) => {
        try {
            const teamUrl = `http://localhost:3000/api/v1/entrenador/equipos/${userId}`;
            const teamData = await (await fetch(teamUrl)).json();
            setTeam(teamData);

            if (teamData.body?.teamid) {
                const playersUrl = `http://localhost:3000/api/v1/entrenador/jugadores/${teamData.body.teamid}`;
                const playersData = await (await fetch(playersUrl)).json();

                const fetchDetails = async (player) => {
                    const posicionalUrl = `http://localhost:3000/api/v1/entrenador/posicional/${player.posicionalid}`;
                    const posicionalData = await (await fetch(posicionalUrl)).json();

                    const habilidadUrls = [
                        `http://localhost:3000/api/v1/entrenador/habilidad/${player.habilidadSubida1}`,
                        `http://localhost:3000/api/v1/entrenador/habilidad/${player.habilidadSubida2}`,
                        `http://localhost:3000/api/v1/entrenador/habilidad/${player.habilidadSubida3}`,
                    ];
                    const habilidades = await Promise.all(habilidadUrls.map(url =>
                        fetch(url).then(res => res.ok ? res.json() : null)
                    ));

                    return {
                        ...player,
                        posicional: posicionalData,
                        habilidadSubida1: habilidades[0]?.body?.habilidadname || ' - ',
                        habilidadSubida2: habilidades[1]?.body?.habilidadname || ' - ',
                        habilidadSubida3: habilidades[2]?.body?.habilidadname || ' - ',
                    };
                };

                const playersWithDetails = await Promise.all(playersData.body.map(fetchDetails));
                setPlayers(playersWithDetails);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!team || !players.length) {
        return <div>No hay equipo o datos de jugadores disponibles.</div>;
    }


    return (
        <>
            <div className="bodyTeamPage">
                <h1>tu equipo</h1>
                <div className="teamCard">
                    <div className="teamCardHeader">
                        <h2>{team.body?.teamname}</h2>
                        <h2>{team.body?.teamrace}</h2>
                        <h2>{team.body?.teamvalue} mo</h2>
                    </div>
                    <div>
                        <h3>jugadores</h3>
                        <table className="playersTable">
                            <thead>
                                <tr>
                                    <th>DORSAL</th>
                                    <th>Nombre</th>
                                    <th>Posición</th>
                                    <th>MA</th>
                                    <th>ST</th>
                                    <th>AG</th>
                                    <th>PA</th>
                                    <th>AR</th>
                                    <th>Valor</th>
                                    <th>Skills</th>
                                    <th>1a subida</th>
                                    <th>2a subida</th>
                                    <th>3a subida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player, index) => (
                                    <tr key={index}>
                                        <td>{player.dorsal}</td>
                                        <td>{player.playername}</td>
                                        <td>{player.posicional?.body?.posicionalname}</td>
                                        <td>{player.posicional?.body?.posicionalma}</td>
                                        <td>{player.posicional?.body?.posicionalst}</td>
                                        <td>{player.posicional?.body?.posicionalag}</td>
                                        <td>{player.posicional?.body?.posicionalpa}</td>
                                        <td>{player.posicional?.body?.posicionalav}</td>
                                        <td>{player.posicional?.body?.posicionalcost}</td>
                                        <td>{player.posicional?.body?.posicionalskills}</td>
                                        <td>{player.habilidadSubida1}</td>
                                        <td>{player.habilidadSubida2}</td>
                                        <td>{player.habilidadSubida3}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="buttonBack" onClick={() => navigate('/mainCoachView')}>Volver</button>
            </div>
        </>
    );
}

export default CoachTeamView;
