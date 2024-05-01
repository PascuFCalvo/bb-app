import React, { useState } from 'react';
import { loginUser } from '../../services/API calls/apiCalls';
import { useNavigate } from 'react-router-dom';
import './formLogin.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        let dataUser = {
            email: email,
            password: password
        };
        event.preventDefault();
        let response = await loginUser(dataUser);
        console.log(response);

        if (response.ok === true) {
            alert(response.message);
            navigate("/mainCoachView");

        } else {
            alert(response.message);
        }
    };

    return (
        <form className="formLogin" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="buttonSubmit" type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
