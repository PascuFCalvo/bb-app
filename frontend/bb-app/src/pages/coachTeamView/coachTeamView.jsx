import React, { useEffect, useState } from 'react';
import './coachTeamView.css';
import { useNavigate } from 'react-router-dom';
import ButtonEditValue from '../../components/buttonEditValue/buttonEditValue.jsx';
import ButtonSaveEditValue from '../../components/buttonSaveEditValue/buttonSaveEditValue.jsx';

function CoachTeamView() {
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredPlayerId, setHoveredPlayerId] = useState(null);
    const [editPlayerId, setEditPlayerId] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
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

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!team || !players.length) {
        return <div>No hay equipo o datos de jugadores disponibles.</div>;
    }

    const handleEditClick = (playerId) => {
        setIsEditing(true);
        setEditPlayerId(playerId);
    };
    const handleCancelEdit = () => {
        setEditPlayerId(null);
    }
    const handleSaveEdit = async (playerId) => {
        const playerToSave = players.find(p => p.playerid === playerId);
        if (!playerToSave) return;

        try {
            const url = `http://localhost:3000/api/v1/entrenador/jugadores/${playerId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerToSave)
            });

            if (response.ok) {
                const updatedPlayer = await response.json();
                setPlayers(players.map(player => player.playerid === playerId ? updatedPlayer : player));
                setEditPlayerId(null);
            } else {
                console.error('Error updating player:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };
    const handleInputChange = (playerId, field, value) => {
        setPlayers(prevPlayers => prevPlayers.map(player => player.playerid === playerId ? {
            ...player,
            [field]: value,
        } : player));
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
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player, index) => (
                                    <tr key={player.playerid}
                                        onMouseEnter={() => setHoveredPlayerId(player.playerid)}
                                        onMouseLeave={() => setHoveredPlayerId(null)}>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.dorsal}
                                                    onChange={e => handleInputChange(player.playerid, 'dorsal', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.dorsal
                                            }
                                        </td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playername}
                                                    onChange={e => handleInputChange(player.playerid, 'playername', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playername
                                            }
                                        </td>
                                        <td>{player.posicional?.body?.posicionalname}</td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playerma}
                                                    onChange={e => handleInputChange(player.playerid, 'posicionalma', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playerma
                                            }
                                        </td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playerst}
                                                    onChange={e => handleInputChange(player.playerid, 'posicionalst', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playerst
                                            }
                                        </td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playerag}
                                                    onChange={e => handleInputChange(player.playerid, 'posicionalag', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playerag
                                            }
                                        </td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playerpa}
                                                    onChange={e => handleInputChange(player.playerid, 'posicionalpa', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playerpa
                                            }
                                        </td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playerav}
                                                    onChange={e => handleInputChange(player.playerid, 'posicionalar', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playerav
                                            }
                                        </td>
                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <input
                                                    type="text"
                                                    value={player.playervalue}
                                                    onChange={e => handleInputChange(player.playerid, 'posicionalvalue', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playervalue
                                            }
                                        </td>
                                        <td>{player.posicional?.body?.posicionalskills}</td>
                                        <td>{player.habilidadSubida1}</td>
                                        <td>{player.habilidadSubida2}</td>
                                        <td>{player.habilidadSubida3}</td>
                                        {
                                            //mostar el boton editar, pero unicamente si no se esta editando, cuando se este editando mostrar el boton de guardar
                                            editPlayerId === player.playerid ?
                                                <ButtonSaveEditValue onClick={() => handleSaveEdit(player.playerid)} />
                                                :
                                                <ButtonEditValue onClick={() => handleEditClick(player.playerid)} />
                                        }

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