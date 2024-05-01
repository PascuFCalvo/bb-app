import React, { useState } from 'react';
import './formRegister.css';
import { registerUser } from '../../services/API calls/apiCalls';
import { useNavigate } from 'react-router-dom';

function FormRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await registerUser(formData);
            console.log(response);
            // Redirigir al login si el usuario se ha creado correctamente
            if (response.ok === true) {
                navigate('/login');
            } else {
                alert('Error al registrar el usuario, el email ya esta en uso:');
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <form className="formRegister" onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Contraseña:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button className='buttonSubmit' type="submit">registrar</button>
        </form>
    );
}

export default FormRegister;
