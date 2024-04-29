import React, { useState } from 'react';
import './formCreateTeam.css';
import { createTeam, registerUser } from '../../services/API calls/apiCalls';

function FormCreateTeam() {
    const [formData, setFormData] = useState({
        teaowner: '',
        teamowner: '',
        teamrace: '',
        teamvalue: ''
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
        createTeam(formData)
    };



    return (
        <form onSubmit={handleSubmit}>
            <label>
                Entrenador:
                <input
                    type="text"
                    name="teamowner"
                    value={formData.teamowner}
                    onChange={handleChange}
                />
            </label>
            <br />
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
                <input
                    type="text"
                    name="teamrace"
                    value={formData.teamrace}
                    onChange={handleChange}
                />
            </label>
            <label>
                Valor:
                <input
                    type="number"
                    name="teamvalue"
                    value={formData.teamvalue}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Registrar</button>
        </form>
    );
}

export default FormCreateTeam;
