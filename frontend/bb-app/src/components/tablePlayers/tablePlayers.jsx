import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { getAllPlayers } from '../../services/API calls/apiCalls';
import "./tablePlayers.css";

const columns = [
    { field: 'dorsal', headerName: 'Dorsal', width: 70 },
    { field: 'playername', headerName: 'Nombre', width: 130 },
    { field: 'posicion', headerName: 'Posición', width: 130 },
    { field: 'equipo', headerName: 'Equipo', width: 130 },
    { field: 'ma', headerName: 'MA', type: 'number', width: 60 },
    { field: 'st', headerName: 'ST', type: 'number', width: 60 },
    { field: 'ag', headerName: 'AG', type: 'number', width: 60 },
    { field: 'pa', headerName: 'PA', type: 'number', width: 60 },
    { field: 'av', headerName: 'AV', type: 'number', width: 60 },
    { field: 'valor', headerName: 'Valor', type: 'number', width: 90 },
    { field: 'skills', headerName: 'Skills', width: 130 },
    { field: 'subida1', headerName: '1a Subida', width: 130 },
    { field: 'subida2', headerName: '2a Subida', width: 130 },
    { field: 'subida3', headerName: '3a Subida', width: 130 },
    { field: 'Lesionado', headerName: 'Lesionado', width: 130, type: 'boolean' },
    { field: 'Sancionado', headerName: 'Sancionado', width: 130, type: 'boolean' },
];

async function fetchSubida(habilidadSubida) {
    const response = await fetch(`http://localhost:3000/api/v1/entrenador/habilidad/${habilidadSubida}`);
    const data = await response.json();
    return data.body ? data.body.habilidadname : "";
}

async function fetchAndUpdatePlayer(player) {
    try {
        const posicionalResponse = await fetch(`http://localhost:3000/api/v1/entrenador/posicional/${player.playerid}`);
        const equipoResponse = await fetch(`http://localhost:3000/api/v1/entrenador/jugadores/equipo/${player.teamid}`);

        if (posicionalResponse.ok && equipoResponse.ok) {
            const posicionalData = await posicionalResponse.json();
            const equipoData = await equipoResponse.json();
            console.log(equipoData.body.teamname);
            const equipo = equipoData.body.teamname ? equipoData.body.teamname : '';

            const [subida1name, subida2name, subida3name] = await Promise.all([
                fetchSubida(player.habilidadSubida1),
                fetchSubida(player.habilidadSubida2),
                fetchSubida(player.habilidadSubida3)
            ]);


            return {
                ...player,
                equipo: equipo,
                ma: posicionalData.body.posicionalma,
                st: posicionalData.body.posicionalst,
                ag: posicionalData.body.posicionalag,
                pa: posicionalData.body.posicionalpa,
                av: posicionalData.body.posicionalav,
                valor: posicionalData.body.posicionalcost,
                skills: posicionalData.body.posicionalskills,
                posicion: posicionalData.body.posicionalname,
                habilidadSubida1: subida1name,
                habilidadSubida2: subida2name,
                habilidadSubida3: subida3name,
            };
        } else {
            console.error(`Error: ${response.status} - No se encontró el recurso para el ID ${player.posicionalid}`);
            return null;
        }
    } catch (error) {
        console.error(`Error al obtener los datos del jugador: ${error}`);
        return null;
    }
}

export default function DataTable() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllPlayers();
                const playersData = response.body;
                setLoading(false);

                const promises = playersData.map(fetchAndUpdatePlayer);
                const updatedPlayers = await Promise.all(promises);
                const filteredPlayers = updatedPlayers.filter(player => player !== null);
                setPlayers(filteredPlayers);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    const rows = players.map((player, index) => ({
        id: index,
        dorsal: player.dorsal,
        playername: player.playername,
        posicion: player.posicion,
        equipo: player.equipo,
        ma: player.ma,
        st: player.st,
        ag: player.ag,
        pa: player.pa,
        av: player.av,
        valor: player.valor,
        skills: player.skills,
        subida1: player.habilidadSubida1,
        subida2: player.habilidadSubida2,
        subida3: player.habilidadSubida3,
        Lesionado: player.Lesionado,
        Sancionado: player.Sancionado,
    }));

    return (
        <div style={{ height: 'auto',width:"auto", backgroundColor: 'bisque' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
