import React, { useState } from 'react';

const LoginForm = () => {
  const [userLogin, setuserLogin] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const loginData = {
      userLogin: userLogin,
      userPassword: userPassword
    };

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json()) 
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwtToken', data.token);
          window.location.href = 'http://localhost:3000/main';
        } else {
          setErrorMessage('Invalid login or password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>Witam w paneli administrowania</h1>
          <p>bazą danych pracowników. Dla zalogowania wpisz login i hasło.</p>
        </div>
      </div>

      <div className="right">
        <h5>Login</h5>

        <div className="inputs">
          <input
            type="text"
            placeholder="user name"
            value={userLogin}
            onChange={e => setuserLogin(e.target.value)}
          />
          <br />
          <input
            type="userPassword"
            placeholder="password"
            value={userPassword}
            onChange={e => setuserPassword(e.target.value)}
          />
        </div>

        <br />
        <br />
        <br />

        
        <button onClick={handleLogin}>Login</button>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginForm;


