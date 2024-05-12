import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonEditValue from '../../components/buttonEditValue/buttonEditValue.jsx';
import ButtonSaveEditValue from '../../components/buttonSaveEditValue/buttonSaveEditValue.jsx';
import './coachTeamView.css';

function CoachTeamView() {
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [habilities, setHabilities] = useState([]);
    const [habilitiesObject, setHabilitiesObject] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredPlayerId, setHoveredPlayerId] = useState(null);
    const [editPlayerId, setEditPlayerId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    let habilidadSubida1 = null;
    let habilidadSubida2 = null;
    let habilidadSubida3 = null;



    useEffect(() => {
        const userStorageInfo = localStorage.getItem("user");
        if (!userStorageInfo) {
            setIsLoading(false);
            return;
        }
        const user = JSON.parse(userStorageInfo);
        fetchTeamAndPlayers(user.userid);
        fetchHabilities();
        console.log(habilitiesObject)
    }, []);

    const fetchHabilities = async () => {
        const habilidadesUrl = 'http://localhost:3000/api/v1/entrenador/habilidades';
        try {
            const response = await fetch(habilidadesUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const habilidadesData = await response.json();

            if (habilidadesData.body && Array.isArray(habilidadesData.body)) {
                const habilidadesObject = {};
                habilidadesData.body.forEach(habilidad => {
                    habilidadesObject[habilidad.habilidadid] = habilidad.habilidadname;
                });

                setHabilitiesObject(habilidadesObject);
            }
        } catch (error) {
            console.error('Failed to fetch habilidades:', error);
        }
    };


    async function fetchTeamAndPlayers(userId) {
        try {
            const teamUrl = `http://localhost:3000/api/v1/entrenador/equipos/${userId}`;
            const teamResponse = await fetch(teamUrl);
            const teamData = await teamResponse.json();
            setTeam(teamData);

            const playersUrl = `http://localhost:3000/api/v1/entrenador/jugadores/${teamData.body?.teamid}`;
            const playersResponse = await fetch(playersUrl);
            const playersData = await playersResponse.json();
            const playersDetails = await Promise.all(playersData.body.map(fetchPlayerDetails));
            setPlayers(playersDetails);
            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }


    async function fetchPlayerDetails(player) {
        const posicionalUrl = `http://localhost:3000/api/v1/entrenador/posicional/${player.posicionalid}`;
        const posicionalResponse = await fetch(posicionalUrl);
        const posicionalData = await posicionalResponse.json();

        habilidadSubida1 = player.habilidadSubida1;
        habilidadSubida2 = player.habilidadSubida2;
        habilidadSubida3 = player.habilidadSubida3;


        return {
            ...player,
            posicional: posicionalData,
            habilidadSubida1,
            habilidadSubida2,
            habilidadSubida3,
        };
    }


    const handleEditClick = playerId => {
        setIsEditing(true);
        setEditPlayerId(playerId);
    };

    const handleSaveEdit = async (playerId) => {


        const player = players.find(player => player.playerid === playerId);

        const updatePlayerUrl = `http://localhost:3000/api/v1/entrenador/jugadores/${playerId}`;
        const updatePlayerData = {
            dorsal: player.dorsal === ' - ' ? null : player.dorsal,
            playername: player.playername === ' - ' ? null : player.playername,

            habilidadSubida1: player.habilidadSubida1 === ' - ' ? null : player.habilidadSubida1,
            habilidadSubida2: player.habilidadSubida2 === ' - ' ? null : player.habilidadSubida2,
            habilidadSubida3: player.habilidadSubida3 === ' - ' ? null : player.habilidadSubida3,
            playerma: player.playerma === ' - ' ? null : player.playerma,
            playerst: player.playerst === ' - ' ? null : player.playerst,
            playerag: player.playerag === ' - ' ? null : player.playerag,
            playerpa: player.playerpa === ' - ' ? null : player.playerpa,
            playerav: player.playerav === ' - ' ? null : player.playerav,
            playerar: player.playerar === ' - ' ? null : player.playerar,
            playervalue: player.playervalue === ' - ' ? null : player.playervalue,
        };

        try {
            const response = await fetch(updatePlayerUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePlayerData),
            });

            if (response.ok) {
                setEditPlayerId(null);
                setIsEditing(false);
            } else {
                console.error('Failed to update player:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update player:', error);
        }

    };

    const handleInputChange = (playerId, field, value) => {
        setPlayers(prevPlayers => prevPlayers.map(player =>
            player.playerid === playerId ? { ...player, [field]: value } : player
        ));
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
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player, index) => (
                                    <tr key={index}
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
                                                    onChange={e => handleInputChange(player.playerid, 'playerma', e.target.value)}
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
                                                    onChange={e => handleInputChange(player.playerid, 'playerst', e.target.value)}
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
                                                    onChange={e => handleInputChange(player.playerid, 'playerag', e.target.value)}
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
                                                    onChange={e => handleInputChange(player.playerid, 'playerpa', e.target.value)}
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
                                                    onChange={e => handleInputChange(player.playerid, 'playerar', e.target.value)}
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
                                                    onChange={e => handleInputChange(player.playerid, 'playervalue', e.target.value)}
                                                    className="editInput"
                                                />
                                                :
                                                player.playervalue
                                            }
                                        </td>
                                        <td>{player.posicional?.body?.posicionalskills}</td>
                                        <td>
                                            {editPlayerId === player.playerid ? (
                                                <select
                                                    value={player.habilidadSubida1}
                                                    onChange={e => handleInputChange(player.playerid, 'habilidadSubida1', e.target.value)}
                                                    className="editInput"
                                                >
                                                    <option value="">- Selecciona -</option>
                                                    {Object.entries(habilitiesObject).map(([habilidadId, habilidadName]) => (
                                                        <option key={habilidadId} value={habilidadId}>
                                                            {habilidadName}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                habilitiesObject[player.habilidadSubida1] || ' - '
                                            )}
                                        </td>

                                        <td>
                                            {editPlayerId === player.playerid ? (
                                                <select
                                                    value={player.habilidadSubida2}
                                                    onChange={e => handleInputChange(player.playerid, 'habilidadSubida2', e.target.value)}
                                                    className="editInput"
                                                >
                                                    <option value="">- Selecciona -</option>
                                                    {Object.entries(habilitiesObject).map(([habilidadId, habilidadName]) => (
                                                        <option key={habilidadId} value={habilidadId}>
                                                            {habilidadName}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                habilitiesObject[player.habilidadSubida2] || ' - '
                                            )}
                                        </td>

                                        <td>
                                            {editPlayerId === player.playerid ? (
                                                <select
                                                    value={player.habilidadSubida3}
                                                    onChange={e => handleInputChange(player.playerid, 'habilidadSubida3', e.target.value)}
                                                    className="editInput"
                                                >
                                                    <option value="">- Selecciona -</option>
                                                    {Object.entries(habilitiesObject).map(([habilidadId, habilidadName]) => (
                                                        <option key={habilidadId} value={habilidadId}>
                                                            {habilidadName}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                habilitiesObject[player.habilidadSubida3] || ' - '
                                            )}
                                        </td>


                                        <td>
                                            {editPlayerId === player.playerid ?
                                                <ButtonSaveEditValue onClick={() => handleSaveEdit(player.playerid)} />
                                                :
                                                <ButtonEditValue onClick={() => handleEditClick(player.playerid)} />
                                            }
                                        </td>
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