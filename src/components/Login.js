import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import the base URL

const Login = () => {
  const [riotId, setRiotId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!riotId || !riotId.includes('#')) {
      setError('Please enter a valid Riot ID (gameName#tagLine).');
      return;
    }

    console.log('Sending request with riotId:', riotId);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, { riotId });
      const { riotId: userRiotId, puuid, summonerLevel, profileIconId, challengeData } = response.data;
      console.log('Challenge Data in Login:', challengeData);
      navigate('/home', { 
        state: { 
          riotId: userRiotId, 
          puuid, 
          summonerLevel, 
          profileIconId, 
          challengeData 
        } 
      });
    } catch (err) {
      console.error('Error:', err.response);
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="container">
      <h2>Login with Riot ID</h2>
      <input
        type="text"
        placeholder="Enter Riot ID (name#tag)"
        value={riotId}
        onChange={(e) => setRiotId(e.target.value.trim())}
      />
      <button onClick={handleLogin}>SUBMIT</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;