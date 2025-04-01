import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Home = () => {
  const { state } = useLocation();
  const { riotId, puuid, summonerLevel, profileIconId, challengeData } = state || {};
  const [content, setContent] = useState(null);

  const profileIconUrl = profileIconId 
    ? `https://ddragon.leagueoflegends.com/cdn/14.19.1/img/profileicon/${profileIconId}.png`
    : 'https://via.placeholder.com/100';

  return (
    <div className="home-page">
      <HamburgerMenu puuid={puuid} challengeData={challengeData} profileIconId={profileIconId} setContent={setContent} />
      <div className="profile-section">
        <img 
          src={profileIconUrl} 
          alt="Profile Icon" 
          className="profile-icon"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
        />
        <h2>{riotId || 'Summoner'} - Level: {summonerLevel || '--'}</h2>
      </div>
      <div className="content-section">
        {content || <p>Select an option from the menu.</p>}
      </div>
    </div>
  );
};

export default Home;