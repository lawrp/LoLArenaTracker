import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import the base URL
import sendButton from '../assets/sendButton.png'; // Import the image
import gameplayVideo from '../assets/arena.mp4'; // Import your gameplay video

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
    <div className="login-page">
      {/* Background video */}
      <video className="background-video" autoPlay loop muted>
        <source src={gameplayVideo} type="video/mp4" />
      </video>

      <div className="title">League Arena Tracker</div>

      <div className="login-container">
        <h2>Enter your Riot ID</h2>
        <div className="input-container">
          <input
            className="login-input"
            type="text"
            placeholder="Enter Riot ID (name#tag)"
            value={riotId}
            onChange={(e) => setRiotId(e.target.value.trim())}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button className="submit-btn" onClick={handleLogin}>
            <img src={sendButton} alt="Submit" />
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
