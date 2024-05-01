import React, { useState } from 'react';
import './formCreateTeam.css';
import { createTeam } from '../../services/API calls/apiCalls';

function FormCreateTeam() {
    // Correcta declaración de la variable y uso de 'const' para obtener datos del localStorage
    const userDataSeason = JSON.parse(localStorage.getItem("user")) || {};  // Agrega un objeto vacío como fallback

    const [formData, setFormData] = useState({
        userid: userDataSeason.userid || '',  // Usa '|| '' ' como fallback para evitar undefined
        teamname: '',
        teamrace: '',
        teamvalue: 1000000,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        createTeam(formData);
    };

    const teamlist = {
        1: "Human",
        2: "Orc",
        3: "Dwarf",
        4: "Skaven",
        5: "Lizardman",
        6: "Wood Elf",
        7: "Chaos",
        8: "Dark Elf",
        9: "Undead",
        10: "Norse",
        11: "Amazon",
        12: "High Elf",
        13: "Bretonnian",
        14: "Necromantic",
        15: "Nurgle",
        16: "Khemri",
        17: "Chaos Dwarf",
        18: "Underworld",
        19: "Ogre",
        20: "Halfling",
        21: "Vampire",
        22: "Goblin",
    };

    return (
        <form className="formCreateTeam" onSubmit={handleSubmit}>
            <label>
                Nombre del equipo:
                <input
                    type="text"
                    name="teamname"
                    value={formData.teamname}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Raza:
                <select
                    name="teamrace"
                    value={formData.teamrace}
                    onChange={handleChange}
                >
                    {Object.entries(teamlist).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </label>
            <br />
            <button className="buttonSubmit" type="submit">Registrar</button>
        </form>
    );
}

export default FormCreateTeam;
