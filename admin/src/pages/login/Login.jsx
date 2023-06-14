import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import "./login.scss"


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/adminlogin/`, { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                navigate('/');
            }
            else {
                setIsModalOpen(<p className='notify-added-product'>Username or password is wrong!</p>);
            }
        } catch (error) {
            setIsModalOpen(<p className='notify-added-product '>Username or password is wrong!</p>);
        }

    }


    return (
        <div className="cover">
            <form className="screen-1" onSubmit={handleSubmit}>
                <h1>FASHION SHOP ADMIN</h1>
                <div className="email">
                    <label htmlFor="email">Email Address</label>
                    <div className="sec-2">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="password" name="password" value={password} onChange={handlePasswordChange} />
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <button className="login">Login </button>
                {isModalOpen}
            </form>
        </div>
    )
}

export default Login