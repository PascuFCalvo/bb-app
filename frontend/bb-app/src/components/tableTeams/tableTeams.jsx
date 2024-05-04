import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getAllTeams, getEntrenador } from '../../services/API calls/apiCalls';
import "./tableTeams.css";

const columns = [
    { field: 'entrenador', headerName: 'Entrenador', width: 250 },
    { field: 'teamName', headerName: 'Nombre', width: 250 },
    { field: 'teamRace', headerName: 'Facción', width: 250 },
    { field: 'teamValue', headerName: 'Valoración', width: 250 },
];

export default function DataTable() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllTeams();
                const teamsData = response.body;
                const updatedTeams = await Promise.all(teamsData.map(async (team) => {
                    try {
                        const entrenadorResponse = await getEntrenador(team.userid);
                        return {
                            ...team,
                            entrenador: entrenadorResponse.body.username,
                        };
                    } catch (error) {
                        console.error(`Error fetching coach data: ${error}`);
                        return team;
                    }
                }));
                setTeams(updatedTeams);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Error fetching data. Please try again later.");
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const rows = teams.map((team, index) => ({
        id: index,
        entrenador: team.entrenador,
        teamName: team.teamname,
        teamRace: team.teamrace,
        teamValue: team.teamvalue,
    }));

    return (
        <div style={{ height: 'auto', width: "auto", backgroundColor: 'bisque' }}>
            {error && <div>Error: {error}</div>}
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
