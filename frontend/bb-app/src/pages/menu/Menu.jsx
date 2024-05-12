import React, { useState, useEffect } from 'react';
import './menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const [playerList, setPlayerList] = useState([]);
    const navigate = useNavigate();

    const getPlayers = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/entrenador/jugadores/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPlayerList(data.body);
        } catch (error) {
            console.error("Error fetching players: ", error);
        }
    };

    const updatePlayer = async () => {
        for (const player of playerList) {
            if (!player.updated) {
                try {
                    const positionalResponse = await fetch(`http://localhost:3000/api/v1/entrenador/posicional/${player.posicionalid}`);
                    if (!positionalResponse.ok) {
                        throw new Error(`HTTP error! status: ${positionalResponse.status}`);
                    }
                    console.log(positionalResponse);
                    const positionalData = await positionalResponse.json();

                    let updatedPlayer = {
                        ...player,
                        playervalue: positionalData.body.posicionalcost,
                        playerma: positionalData.body.posicionalma,
                        playerpa: positionalData.body.posicionalpa,
                        playerst: positionalData.body.posicionalst,
                        playerag: positionalData.body.posicionalag,
                        playerav: positionalData.body.posicionalav,
                        updated: true,
                    };
                    console.log("Updated player: ", updatedPlayer);

                    const updateResponse = await fetch(`http://localhost:3000/api/v1/entrenador/jugadores/${player.playerid}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedPlayer),
                    });

                    if (!updateResponse.ok) {
                        throw new Error(`HTTP error! status: ${updateResponse.status}`);
                    }

                    console.log("Updated", await updateResponse.json());
                } catch (error) {
                    console.error("Error updating player: ", error);
                }
            }
        }
    };

    useEffect(() => {
        getPlayers();
        console.log(playerList)

        //ejecutar la funcion updatePlayer por cada jugador en playerList

        playerList.forEach(player => {
            if (player.updated !== undefined || player.updated !== false || player.updated !== null) {
                updatePlayer();
            }
        });


    }, []);

    // Run updatePlayer when playerList is updated

    return (
        <div className="menuScreen1">
            <h1>PetreobowL</h1>
            <div className="menuButtons">
                <button className='buttonMenu' onClick={() => navigate("/register")}>Registrar Entrenador</button>
                <button className='buttonMenu' onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
}

export default Menu;
