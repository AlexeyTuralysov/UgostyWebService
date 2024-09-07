// Ваш компонент для входа, например Login.js

import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.access);

            navigate('/' + response.username);
            // Дополнительная логика после успешного входа
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default Auth;
